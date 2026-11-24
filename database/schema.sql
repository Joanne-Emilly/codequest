-- Run once on an empty CodeQuest Supabase project. Access roles and class rosters
-- are provisioned by a trusted administrator through SQL or the dashboard.
begin;
create schema codequest_private;
revoke all on schema codequest_private from public, anon, authenticated;

create table public.cq_teachers (
  user_id uuid primary key references auth.users on delete cascade
);
create table public.cq_classes (
  id bigint generated always as identity primary key,
  name text not null,
  teacher_id uuid not null references public.cq_teachers on delete cascade
);
create table public.cq_enrollments (
  class_id bigint references public.cq_classes on delete cascade,
  student_id uuid references auth.users on delete cascade,
  display_name text not null check(length(display_name) between 1 and 80),
  primary key(class_id,student_id)
);
create table public.cq_progress (
  student_id uuid primary key references auth.users on delete cascade,
  stage integer not null default 0 check(stage between 0 and 32),
  xp integer not null default 0 check(xp>=0)
);
create table public.cq_attempts (
  id bigint generated always as identity primary key,
  student_id uuid not null references auth.users on delete cascade,
  stage integer not null check(stage between 0 and 31),
  response jsonb not null,
  correct boolean not null,
  awarded_xp integer not null default 0,
  created_at timestamptz not null default now()
);
create index on public.cq_attempts(student_id,created_at);
create index on public.cq_enrollments(student_id);
create index on public.cq_classes(teacher_id);

alter table public.cq_teachers enable row level security;
alter table public.cq_classes enable row level security;
alter table public.cq_enrollments enable row level security;
alter table public.cq_progress enable row level security;
alter table public.cq_attempts enable row level security;
revoke all on public.cq_teachers, public.cq_classes, public.cq_enrollments, public.cq_progress, public.cq_attempts from anon, authenticated, public;
grant select on public.cq_teachers, public.cq_classes, public.cq_enrollments, public.cq_progress, public.cq_attempts to authenticated;
create policy cq_teacher_read on public.cq_teachers for select to authenticated using(user_id=(select auth.uid()));
create policy cq_owned_classes on public.cq_classes for select to authenticated using(teacher_id=(select auth.uid()));
create policy cq_roster_read on public.cq_enrollments for select to authenticated using(student_id=(select auth.uid()) or exists(select 1 from public.cq_classes c where c.id=class_id));
create policy cq_progress_read on public.cq_progress for select to authenticated using(student_id=(select auth.uid()) or exists(select 1 from public.cq_enrollments e join public.cq_classes c on c.id=e.class_id where e.student_id=cq_progress.student_id));
create policy cq_attempt_read on public.cq_attempts for select to authenticated using(student_id=(select auth.uid()) or exists(select 1 from public.cq_enrollments e join public.cq_classes c on c.id=e.class_id where e.student_id=cq_attempts.student_id));

create table codequest_private.activities(
  stage integer primary key, expected jsonb not null, reward integer not null
);
insert into codequest_private.activities values
 (0,'true',5),(1,'1',10),(2,'0',30),(3,'"12"',0),
 (4,'true',5),(5,'2',10),(6,'1',30),(7,'"25"',0),
 (8,'true',5),(9,'2',10),(10,'1',30),(11,'"Preparar\nTestar\nApresentar"',0),
 (12,'true',5),
 (13,'1',10),
 (14,'2',30),
 (15,'"2"',0),
 (16,'true',5),
 (17,'2',10),
 (18,'0',30),
 (19,'"13\n5"',0),
 (20,'true',5),
 (21,'1',10),
 (22,'2',30),
 (23,'"2 1"',0),
 (24,'true',5),
 (25,'0',10),
 (26,'1',30),
 (27,'"13"',0),
 (28,'true',5),
 (29,'2',10),
 (30,'0',30),
 (31,'"Laboratório aberto\nLaboratório fechado\nLaboratório aberto"',0);
-- Practice outputs are formative. Never credit competitive XP for a browser result.
create function public.cq_submit(p_stage integer, p_answer jsonb)
returns jsonb language plpgsql security definer set search_path='' as $$
declare
  uid uuid := auth.uid();
  current_stage integer;
  total_xp integer;
  expected_answer jsonb;
  is_correct boolean;
  reward integer;
begin
  if uid is null then raise exception 'Entre na sua conta.'; end if;
  if p_stage is null or p_stage not between 0 and 31 or p_answer is null or octet_length(p_answer::text)>65536 then
    raise exception 'Atividade ou resposta inválida.';
  end if;
  insert into public.cq_progress(student_id) values(uid) on conflict do nothing;
  select p.stage,p.xp into current_stage,total_xp from public.cq_progress p where p.student_id=uid for update;
  if p_stage > current_stage then raise exception 'Conclua a etapa anterior.'; end if;
  select a.expected,a.reward into expected_answer,reward from codequest_private.activities a where a.stage=p_stage;
  if p_stage % 4 = 3 then
    is_correct := jsonb_typeof(p_answer)='object' and jsonb_typeof(p_answer->'code')='string'
      and length(btrim(p_answer->>'code'))>0 and jsonb_typeof(p_answer->'output')='string'
      and rtrim(replace(p_answer->>'output', E'\r\n', E'\n'), E'\n')=(expected_answer#>>'{}');
  else
    is_correct := p_answer=expected_answer;
  end if;
  is_correct := coalesce(is_correct,false);
  if is_correct and p_stage=current_stage then
    current_stage := current_stage + 1;
    total_xp := total_xp + reward;
    update public.cq_progress set stage=current_stage,xp=total_xp where student_id=uid;
  else
    reward := 0;
  end if;
  insert into public.cq_attempts(student_id,stage,response,correct,awarded_xp) values(uid,p_stage,p_answer,is_correct,reward);
  return jsonb_build_object('correct',is_correct,'stage',current_stage,'xp',total_xp);
end;
$$;

create function public.cq_teacher_report()
returns table(student_id uuid, display_name text, class_name text,stage integer,xp integer,attempts bigint,correct_attempts bigint,last_activity timestamptz)
language sql stable security invoker set search_path='' as $$
  select e.student_id,e.display_name,c.name,coalesce(p.stage,0),coalesce(p.xp,0),
    count(a.id),count(a.id) filter(where a.correct),max(a.created_at)
  from public.cq_classes c join public.cq_enrollments e on e.class_id=c.id
  left join public.cq_progress p on p.student_id=e.student_id
  left join public.cq_attempts a on a.student_id=e.student_id
  where c.teacher_id=auth.uid()
  group by c.id,c.name,e.student_id,e.display_name,p.stage,p.xp order by c.name,e.display_name;
$$;
revoke all on function public.cq_submit(integer,jsonb),public.cq_teacher_report() from public,anon;
grant execute on function public.cq_submit(integer,jsonb),public.cq_teacher_report() to authenticated;
commit;
