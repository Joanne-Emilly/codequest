alter table public.cq_progress drop constraint cq_progress_stage_check, add constraint cq_progress_stage_check check(stage between 0 and 32);
alter table public.cq_attempts drop constraint cq_attempts_stage_check, add constraint cq_attempts_stage_check check(stage between 0 and 31);
insert into codequest_private.activities values
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
create or replace function public.cq_submit(p_stage integer, p_answer jsonb)
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

