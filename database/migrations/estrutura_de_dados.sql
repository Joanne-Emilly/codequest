alter table public.cq_progress add column ed_stage integer not null default 0 check(ed_stage between 0 and 36);
alter table public.cq_attempts drop constraint cq_attempts_stage_check, add constraint cq_attempts_stage_check check(stage between 0 and 67);
insert into codequest_private.activities values
 (32,'true',5),
 (33,'1',10),
 (34,'0',30),
 (35,'"5 9"',0),
 (36,'true',5),
 (37,'1',10),
 (38,'2',30),
 (39,'"12 21"',0),
 (40,'true',5),
 (41,'2',10),
 (42,'0',30),
 (43,'"Sol\nLua"',0),
 (44,'true',5),
 (45,'1',10),
 (46,'2',30),
 (47,'"4 9 13"',0),
 (48,'true',5),
 (49,'0',10),
 (50,'1',30),
 (51,'"1 2 3 6 8"',0),
 (52,'true',5),
 (53,'1',10),
 (54,'2',30),
 (55,'"2"',0),
 (56,'true',5),
 (57,'0',10),
 (58,'1',30),
 (59,'"8 3 6"',0),
 (60,'true',5),
 (61,'1',10),
 (62,'2',30),
 (63,'"2 2"',0),
 (64,'true',5),
 (65,'1',10),
 (66,'2',30),
 (67,'"A B C D"',0);
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
  if p_stage is null or p_stage not between 0 and 67 or p_answer is null or octet_length(p_answer::text)>65536 then
    raise exception 'Atividade ou resposta inválida.';
  end if;
  insert into public.cq_progress(student_id) values(uid) on conflict do nothing;
  select case when p_stage >= 32 then p.ed_stage + 32 else p.stage end,p.xp into current_stage,total_xp from public.cq_progress p where p.student_id=uid for update;
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
    update public.cq_progress set stage=case when p_stage < 32 then current_stage else stage end, ed_stage=case when p_stage >= 32 then current_stage-32 else ed_stage end,xp=total_xp where student_id=uid;
  else
    reward := 0;
  end if;
  insert into public.cq_attempts(student_id,stage,response,correct,awarded_xp) values(uid,p_stage,p_answer,is_correct,reward);
  return jsonb_build_object('correct',is_correct,'stage',case when p_stage >= 32 then current_stage-32 else current_stage end,'xp',total_xp);
end;
$$;

