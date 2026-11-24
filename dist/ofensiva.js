import {studyAttempts} from './cloud.js';

const zone = 'America/Fortaleza';
const dayFormat = new Intl.DateTimeFormat('en-CA', {timeZone: zone, year:'numeric', month:'2-digit', day:'2-digit'});
const label = new Intl.DateTimeFormat('pt-BR', {weekday:'short', day:'2-digit', month:'2-digit',timeZone:'UTC'});
const storageKey = 'cq-guest-study-days';

function guestDays() {
  return JSON.parse(localStorage.getItem(storageKey) || '{}');
}
export function recordGuestStage(stage) {
  const days = guestDays();
  const today = dayFormat.format(new Date());
  days[today] = [...new Set([...(days[today] || []), stage])];
  localStorage.setItem(storageKey, JSON.stringify(days));
}
function shift(day, amount) {
  const date = new Date(day+'T12:00:00Z');
  date.setUTCDate(date.getUTCDate()+amount);
  return date.toISOString().slice(0,10);
}
export function streaks(days, today) {
  let previous, run = 0, best = 0;
  for (const day of Object.keys(days).filter(d=>days[d].length && d<=today).sort()) {
    run = previous && shift(previous,1) === day ? run+1 : 1;
    best = Math.max(run,best);
    previous = day;
  }
  return {current: previous === today || previous === shift(today,-1) ? run : 0, best};
}
export async function showOffensive(panel, studentId) {
  panel.textContent = 'Carregando seu histórico…';
  try {
    let days;
    if (studentId) {
      days = {};
      for (const attempt of await studyAttempts(studentId)) {
        const day = dayFormat.format(new Date(attempt.created_at));
        const stages = days[day] ||= [];
        if (!stages.includes(attempt.stage)) stages.push(attempt.stage);
      }
    } else days = guestDays();
    const today = dayFormat.format(new Date());
    const first = Object.keys(days).sort()[0] || today;
    const {current,best} = streaks(days,today);
    let last = today;
    function draw() {
      const start = shift(last,-6);
      const records = Array.from({length:7},(_,i)=>{
        const day = shift(start,i);
        const count = days[day]?.length || 0;
        const date = label.format(new Date(day+'T12:00:00Z'));
        return '<li class="day-record"><strong>'+(day===today?'Hoje · ':'')+date+'</strong><span>'+count+' '+(count===1?'atividade':'atividades')+'</span></li>';
      }).join('');
      panel.innerHTML = '<article class="card"><div class="stats"><div class="stat">Ofensiva atual<b>'+current+' '+(current===1?'dia':'dias')+'</b></div><div class="stat">Recorde pessoal<b>'+best+' '+(best===1?'dia':'dias')+'</b></div></div><p class="sub space">'+(days[today]?.length?'Você já marcou sua ofensiva de hoje.':'Conclua uma atividade da trilha para marcar o dia de hoje.')+'</p></article><article class="card"><h2>Histórico diário</h2><ol class="day-list">'+records+'</ol><div class="heading"><button class="link" data-back '+(start<=first?'disabled':'')+'>← Anteriores</button><button class="link" data-forward '+(last>=today?'disabled':'')+'>Seguintes →</button></div><p class="sub">Cada atividade da trilha conta uma vez por dia. Dias seguem o horário de Fortaleza.</p></article>';
      panel.querySelector('[data-back]').onclick = ()=>{last=shift(last,-7);draw()};
      panel.querySelector('[data-forward]').onclick = ()=>{last=shift(last,7);draw()};
    }
    draw();
  } catch {
    panel.innerHTML = '<p>Não foi possível carregar o histórico.</p><button class="link">Tentar novamente</button>';
    panel.querySelector('button').onclick = ()=>showOffensive(panel,studentId);
  }
}
