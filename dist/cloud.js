import {URL as projectURL, KEY} from './config.js';

export const configured = Boolean(projectURL && KEY);
let clientPromise;

async function getClient() {
  if (!configured) throw new Error('A conexão da turma com o Supabase ainda precisa ser configurada.');
  if (!clientPromise) {
    clientPromise = import('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.119.0/+esm')
      .then(({createClient}) => createClient(projectURL, KEY))
      .catch(error => { clientPromise = null; throw error; });
  }
  return clientPromise;
}

function result({data, error}) {
  if (error) throw error;
  return data;
}

export async function login(email, password) {
  const client = await getClient();
  return result(await client.auth.signInWithPassword({email, password})).user;
}

export async function signup(email, password) {
  const client = await getClient();
  const {user, session} = result(await client.auth.signUp({email, password}));
  return session ? user : null;
}

export async function logout() {
  result(await (await getClient()).auth.signOut({scope:'local'}));
}

export async function getUser() {
  if (!configured) return null;
  const client = await getClient();
  if (!result(await client.auth.getSession()).session) return null;
  return result(await client.auth.getUser()).user;
}

export async function getProgress() {
  const user = await getUser();
  if (!user) return 0;
  const client = await getClient();
  return result(await client.from('cq_progress').select('stage').eq('student_id', user.id).maybeSingle())?.stage ?? 0;
}

export async function submit(stage, answer) {
  const client = await getClient();
  return result(await client.rpc('cq_submit', {p_stage:stage, p_answer:answer}));
}

export async function isTeacher() {
  const user = await getUser();
  if (!user) return false;
  const client = await getClient();
  return Boolean(result(await client.from('cq_teachers').select('user_id').eq('user_id', user.id).maybeSingle()));
}

export async function teacherReport() {
  const client = await getClient();
  return result(await client.rpc('cq_teacher_report'));
}

export async function studyAttempts(studentId) {
  const client = await getClient();
  const attempts = [];
  let after = 0;
  while (true) {
    const page = result(await client.from('cq_attempts').select('id,stage,created_at')
      .eq('student_id', studentId).eq('correct', true).gt('id', after)
      .order('id').limit(500));
    attempts.push(...page);
    if (page.length < 500) return attempts;
    after = page[page.length - 1].id;
  }
}
