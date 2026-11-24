create or replace function public.cq_teacher_report()
returns table(student_id uuid, display_name text, class_name text,stage integer,xp integer,attempts bigint,correct_attempts bigint,last_activity timestamptz)
language sql stable security invoker set search_path='' as $$
  select e.student_id,e.display_name,c.name,coalesce(p.stage+p.ed_stage,0),coalesce(p.xp,0),
    count(a.id),count(a.id) filter(where a.correct),max(a.created_at)
  from public.cq_classes c join public.cq_enrollments e on e.class_id=c.id
  left join public.cq_progress p on p.student_id=e.student_id
  left join public.cq_attempts a on a.student_id=e.student_id
  where c.teacher_id=auth.uid()
  group by c.id,c.name,e.student_id,e.display_name,p.stage,p.ed_stage,p.xp order by c.name,e.display_name;
$$;
