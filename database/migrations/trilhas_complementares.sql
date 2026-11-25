begin;
alter table public.cq_progress add column extra_stages integer[] not null default array_fill(0,array[9]);
alter table public.cq_attempts drop constraint cq_attempts_stage_check, add constraint cq_attempts_stage_check check(stage between 0 and 103);
insert into codequest_private.activities values
 (68,'true',5),
 (69,'1',10),
 (70,'2',30),
 (71,'"False\nTrue\nTrue"',0),
 (72,'true',5),
 (73,'2',10),
 (74,'0',30),
 (75,'"Lia\nBia"',0),
 (76,'true',5),
 (77,'1',10),
 (78,'2',30),
 (79,'"3"',0),
 (80,'true',5),
 (81,'0',10),
 (82,'1',30),
 (83,'"False\nTrue"',0),
 (84,'true',5),
 (85,'1',10),
 (86,'0',30),
 (87,'"12\n14"',0),
 (88,'true',5),
 (89,'1',10),
 (90,'2',30),
 (91,'"9"',0),
 (92,'true',5),
 (93,'1',10),
 (94,'2',30),
 (95,'"0\n1\n1\n0"',0),
 (96,'true',5),
 (97,'1',10),
 (98,'0',30),
 (99,'"Open the file.\nTry again."',0),
 (100,'true',5),
 (101,'2',10),
 (102,'1',30),
 (103,'"80"',0);
create or replace function public.cq_submit(p_stage integer, p_answer jsonb)
returns jsonb language plpgsql security definer set search_path='' as $$
declare
  uid uuid := auth.uid();
  slot integer := (p_stage-68)/4+1;
  current_stage integer;
  total_xp integer;
  expected_answer jsonb;
  is_correct boolean;
  reward integer;
begin
  if uid is null then raise exception 'Entre na sua conta.'; end if;
  if p_stage is null or p_stage not between 0 and 103 or p_answer is null or octet_length(p_answer::text)>65536 then
    raise exception 'Atividade ou resposta inválida.';
  end if;
  insert into public.cq_progress(student_id) values(uid) on conflict do nothing;
  select case when p_stage >= 68 then 68+4*(slot-1)+p.extra_stages[slot] when p_stage >= 32 then p.ed_stage + 32 else p.stage end,p.xp into current_stage,total_xp from public.cq_progress p where p.student_id=uid for update;
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
    update public.cq_progress set stage=case when p_stage < 32 then current_stage else stage end, ed_stage=case when p_stage between 32 and 67 then current_stage-32 else ed_stage end,xp=total_xp where student_id=uid;
    if p_stage >= 68 then
      update public.cq_progress set extra_stages[slot]=current_stage-(68+4*(slot-1)) where student_id=uid;
    end if;
  else
    reward := 0;
  end if;
  insert into public.cq_attempts(student_id,stage,response,correct,awarded_xp) values(uid,p_stage,p_answer,is_correct,reward);
  return jsonb_build_object('correct',is_correct,'stage',case when p_stage >= 68 then current_stage-(68+4*(slot-1)) when p_stage >= 32 then current_stage-32 else current_stage end,'xp',total_xp);
end;
$$;

create or replace function public.cq_teacher_report()
returns table(student_id uuid, display_name text, class_name text,stage integer,xp integer,attempts bigint,correct_attempts bigint,last_activity timestamptz)
language sql stable security invoker set search_path='' as $$
  select e.student_id,e.display_name,c.name,coalesce(p.stage+p.ed_stage+(select sum(n)::integer from unnest(p.extra_stages) n),0),coalesce(p.xp,0),
    count(a.id),count(a.id) filter(where a.correct),max(a.created_at)
  from public.cq_classes c join public.cq_enrollments e on e.class_id=c.id
  left join public.cq_progress p on p.student_id=e.student_id
  left join public.cq_attempts a on a.student_id=e.student_id
  where c.teacher_id=auth.uid()
  group by c.id,c.name,e.student_id,e.display_name,p.stage,p.ed_stage,p.extra_stages,p.xp order by c.name,e.display_name;
$$;
commit;
