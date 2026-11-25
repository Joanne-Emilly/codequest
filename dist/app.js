import {tracks} from './complementares.js';
import {estruturas} from './estruturas.js';
import {recordGuestStage, showOffensive} from './ofensiva.js';
import {units} from './curriculum.js';
import * as cloud from './cloud.js';
import {execute,stop} from './python.js';
const $=s=>document.querySelector(s),view=$('#view'),dlg=$('#dlg'),modal=$('#modal');
const icons={inicio:'M3 11l9-8 9 8v9H15v-6H9v6H3z',trilha:'M4 5h10a3 3 0 010 6H9a4 4 0 000 8h11 M17 16l3 3-3 3',lab:'M3 4h18v16H3z M6 9l3 3-3 3m6 0h5',medal:'M8 3H4v4a5 5 0 005 5m7-9h4v4a5 5 0 01-5 5M8 3h8v5a4 4 0 01-8 0z M12 12v7m-5 2h10',perfil:'M8 7a4 4 0 108 0 4 4 0 10-8 0 M4 21a8 8 0 0116 0',book:'M3 5q5-2 9 1 4-3 9-1v14q-5-2-9 1-4-3-9-1z M12 6v14',lock:'M6 10h12v10H6z M8 10V7a4 4 0 018 0v3',bolt:'M14 2L4 14h7l-1 8 10-13h-7z',flame:'M12 2c2 6 7 8 7 13a7 7 0 01-14 0c0-3 1-5 4-8 0 4 2 5 3 5 2-3 1-7 0-10z',target:'M12 3a9 9 0 100 18 9 9 0 000-18z M12 8a4 4 0 100 8 4 4 0 000-8z'};
function icon(k,n=20){return '<svg aria-hidden="true" width="'+n+'" height="'+n+'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="'+icons[k]+'"/></svg>'}
const tabs={inicio:'Visão geral',trilha:'Minha trilha',ofensiva:'Ofensiva',lab:'Laboratório',medal:'Conquistas',perfil:'Meu perfil'},names=['Conteúdo','Exercício','Quiz','Prática'],points=[5,10,30,0];
let user=null,teacher=false,stage=Number(localStorage.getItem('cq-stage'))||0,route,activity;
let edStage = Number(localStorage.getItem('cq-ed-stage')) || 0;
const edTotal = estruturas.length * 4;
const totalStages = units.length * 4;
const catalog = [
  {slug:'trilha', name:'Lógica de programação em Python', lessons:units, offset:0, key:'cq-stage'},
  {slug:'estruturas', name:'Estrutura de Dados', lessons:estruturas, offset:32, key:'cq-ed-stage'},
  ...tracks.map(t=>({...t, lessons:[t.unit], key:'cq-stage-'+t.slug}))
];
const extras = Object.fromEntries(tracks.map(t=>[t.slug,Number(localStorage.getItem('cq-stage-'+t.slug))||0]));
function completedFor(track){
  if(track.offset===0) return stage;
  if(track.offset===32) return edStage;
  return extras[track.slug];
}
function trackCard(track){
  const count=completedFor(track), total=track.lessons.length*4;
  return '<button class="track-summary" data-go="'+track.slug+'"><span class="tile">'+icon('book')+'</span><span><strong>'+esc(track.name)+'</strong><span class="bar"><b style="width:'+100*count/total+'%"></b></span><span>'+count+' de '+total+' atividades concluídas</span></span></button>';
}
const trackXP = completed => Array.from({length:completed},(_,i)=>points[i%4]).reduce((a,b)=>a+b,0);
const score = () => catalog.reduce((sum,t)=>sum+trackXP(completedFor(t)),0);
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function intro(a,b){return '<div class="intro"><h1>'+a+'</h1><p>'+b+'</p></div>'}
function pathCard(track){const progress=completedFor(track), lessons=track.lessons;
const label='TRILHA '+String(catalog.indexOf(track)+1).padStart(2,'0');return '<article class="card"><div class="heading"><h2>Unidades</h2><span class="tag">'+label+'</span></div><div class="world row"><span class="tile">'+icon('lab',24)+'</span><div><span class="eyebrow">'+label+'</span><strong>'+esc(track.name)+'</strong></div></div>'+lessons.map((u,i)=>'<button '+(i*4>progress?'disabled':'data-unit="'+i+'"')+' class="step row '+(i===Math.floor(progress/4)?'current':'')+'"><span class="node">'+icon(i*4>progress?'lock':'book')+'</span><div><label>Unidade 0'+(i+1)+'</label><strong>'+esc(u.title)+'</strong></div><span class="end">'+(i*4>progress?'':i*4+4<=progress?'✓':'›')+'</span></button>').join('')+'</article>'}
function progress(){return '<article class="card"><div class="heading"><h2>Meu progresso</h2></div><div class="stats"><div class="stat">'+icon('bolt')+'<b>'+score()+'</b><label>XP total</label></div><div class="stat">'+icon('target')+'<b>'+stage+'</b><label>Atividades concluídas</label></div></div><div class="row space"><strong>'+ (score()<200?'Dev Iniciante':'Aprendiz de Código')+'</strong></div><div class="bar"><b style="width:'+Math.min(100,stage/totalStages*100)+'%"></b></div><label>'+stage+' de '+totalStages+' atividades da trilha inicial</label></article>'}
function homePage() {
  const next = Math.min(Math.floor(stage / 4), units.length - 1);
  const actions = [
    ['data-start', 'book', 'Continuar aprendendo', 'Retome sua atividade'],
    ['data-go="lab"', 'lab', 'Laboratório Python', 'Escreva e execute código'],
    ['data-go="ofensiva"', 'flame', 'Minha ofensiva', 'Veja seus dias de estudo'],
    ['data-go="medal"', 'medal', 'Conquistas', 'Explore suas medalhas']
  ];
  const shortcuts = actions.map(([action,glyph,title,detail]) =>
    `<button ${action}><span class="home-glyph">${icon(glyph,32)}</span><strong>${title}</strong><span>${detail}</span></button>`).join('');
  const track = units.slice(Math.max(0, Math.min(next, units.length-3)), Math.max(0, Math.min(next, units.length-3))+3)
    .map(u => {
      const i = units.indexOf(u);
      const locked = i*4 > stage;
      return `<button class="home-unit" ${locked?'disabled':'data-unit="'+i+'"'}><span class="unit-art">${icon(['book','lab','trilha'][i%3],44)}</span><small>UNIDADE ${String(i+1).padStart(2,'0')}</small><strong>${esc(u.title)}</strong><span>${locked?'Bloqueada':stage >= i*4+4?'Concluída ✓':'Disponível →'}</span></button>`;
    }).join('');
  return `<div class="home-grid"><section><div class="welcome"><span class="welcome-mark" aria-hidden="true">{ }</span><div><h1>${stage?'Boas-vindas de volta!':'Boas-vindas ao CodeQuest!'}</h1><p class="sub">Venha Aprender Programação na CodeQuest. Resolva exercícios, experimente no laboratório e avance na sua trilha.</p></div></div>
    <h2>Por onde começar</h2><div class="home-actions">${shortcuts}</div>
    <div class="heading"><h2>Unidades da trilha</h2><button class="link" data-go="trilha">Ver todas →</button></div><div class="home-units">${track}</div></section>
    <section class="home-rail"><h2>Suas trilhas</h2>${catalog.map(trackCard).join('')}<p class="tag">${score()} XP</p>
    <article class="mentor card"><img src="joanne.webp" alt="Profª Joanne"><h2>Desafio do dia</h2><p class="sub">Coloque sua lógica à prova com uma pergunta da Profª Joanne.</p><button class="cta" data-daily>Resolver desafio →</button></article></section></div>`;
}
function render(){route=location.hash.slice(1)||'inicio';if(!Object.hasOwn(tabs,route) && !catalog.some(t=>t.slug===route))route='inicio';$('nav').innerHTML=Object.entries(tabs).map(([k,v])=>'<button class="'+(route===k || catalog.some(t=>t.slug===route) && k==='trilha'?'active':'')+'" data-go="'+k+'">'+icon(k==='ofensiva'?'flame':k)+v+'</button>').join('');$('#person').textContent=user?'Estudante':'Explorador';
document.body.classList.toggle('home', route==='inicio');
if(route==='inicio')view.innerHTML=homePage();
const track=catalog.find(t=>t.slug===route);
if(track) view.innerHTML=intro(track.name,'Explore as unidades e avance uma atividade por vez.')+'<button class="link" data-go="inicio">Ver todas as trilhas</button>'+pathCard(track);
if(route==='ofensiva'){view.innerHTML=intro('Ofensiva','Acompanhe seus dias consecutivos de estudo.')+'<div class="space" id="study-days"></div>';showOffensive($('#study-days'),user?.id)}
if(route==='medal')view.innerHTML=intro('Conquistas','Suas medalhas acompanham o progresso na trilha.')+'<div class="card space">'+units.map((u,i)=>'<div class="step row"><span class="node">'+icon(stage>=4*i+4?'medal':'lock')+'</span><div><strong>'+['Primeiro algoritmo','Mestre da lógica','Explorador de fluxos','Guardião das decisões','Ninja das funções','Arquiteto de objetos','Guardião dos dados','Mestre dos eventos'][i]+'</strong><label>'+ (stage>=4*i+4?'Conquistada':'Conclua a unidade 0'+(i+1))+'</label></div></div>').join('')+'</div>';
if(route==='lab'){view.innerHTML=intro('Laboratório Python','Escreva seu código, execute e confira a saída.')+'<div class="card space">'+editor('print("Olá, Dev!")')+'</div>';bindEditor(view)}
if(route==='perfil')profile()}
function editor(code){return '<label>Código Python<textarea spellcheck="false" class="code">'+esc(code)+'</textarea></label><label>Entrada de dados<input class="stdin" placeholder="Entrada para input()"></label><button class="cta run">▷ Executar</button> <button class="link halt">Interromper</button><pre aria-live="polite" class="out">Terminal pronto.</pre>'}
function bindEditor(el){el.querySelector('.halt').onclick=()=>stop();el.querySelector('.run').onclick=async()=>{const out=el.querySelector('.out');out.textContent='Carregando Python…';try{const result=await execute(el.querySelector('.code').value,el.querySelector('.stdin').value);out.textContent=result||'Execução concluída.'}catch(e){out.textContent=e.message}}}
function open(html){modal.innerHTML=html;if(!dlg.open)dlg.showModal()}dlg.querySelector('.close').onclick=()=>dlg.close();dlg.onclose=()=>stop();
function lesson(s,track=catalog[0]){activity=s;let u=track.lessons[Math.floor(s/4)],k=s%4;open('<span class="eyebrow">UNIDADE 0'+(Math.floor(s/4)+1)+' · '+names[k].toUpperCase()+'</span><h2>'+u.title+'</h2>'+(k===0?'<p>'+u.lesson+'</p><pre>'+esc(u.example)+'</pre>'+(u.source?'<p class="sub"><small>'+esc(u.source)+'</small></p>':'')+'<button class="cta" id="advance">Concluir leitura →</button>':k===3?'<p>'+u.practice+'</p>'+editor(u.starter)+'<button class="cta" id="verify">Verificar solução</button>':'<p>'+(k===1?u.question:u.quiz)+'</p>'+(k===1?u.options:u.quizOptions).map((v,i)=>'<button class="option" data-choice="'+i+'">'+v+'</button>').join(''))+'<details class="space"><summary>Dica da Profª Joanne</summary><p>'+u.hint+'</p></details><div id="feedback" role="status"></div>');
if(k===0)$('#advance').onclick=()=>submit(s,true,true,track);
if(k===1||k===2)modal.querySelectorAll('[data-choice]').forEach(b=>b.onclick=()=>submit(s,+b.dataset.choice,+b.dataset.choice===(k===1?u.answer:u.quizAnswer),track));
if(k===3){bindEditor(modal);$('#verify').onclick=async()=>{let code=modal.querySelector('.code').value;try{$('#feedback').textContent='Executando teste…';let output=await execute(code,modal.querySelector('.stdin').value);modal.querySelector('.out').textContent=output;await submit(s,{output:output.trim(),code},output.trim()===u.expected,track)}catch(e){$('#feedback').textContent=e.message}}}}
let busy=false;async function submit(s,a,ok,track){if(busy)return;busy=true;const id=track.offset+s;const count=track.lessons.length*4;let completed=completedFor(track);try{if(user){let r=await cloud.submit(id,a);ok=r.correct;if(ok)completed=r.stage}else if(ok&&s===completed){completed++;localStorage.setItem(track.key,completed)}if(track.offset===0)stage=completed;else if(track.offset===32)edStage=completed;else extras[track.slug]=completed;if(!user && ok)recordGuestStage(id);if(!ok){$('#feedback').textContent='Vamos tentar de novo? Consulte a dica e revise sua resposta.';return}render();open('<span class="eyebrow">✓ ATIVIDADE CONCLUÍDA</span><h2>Mandou bem, Dev!</h2><p>'+completed+' de '+count+' atividades concluídas.</p><button class="cta" id="next">'+(s<count-1?'Próxima atividade →':'Voltar à trilha')+'</button>');$('#next').onclick=()=>s<count-1?lesson(s+1,track):dlg.close()}catch(e){$('#feedback').textContent=e.message}finally{busy=false}}
function profile(){view.innerHTML=intro('Meu perfil',user?'Sua conta está conectada.':'Entre para sincronizar sua trilha entre dispositivos.')+'<div class="card space">'+(user?'<h3>'+esc(user.email)+'</h3><button class="link" id="logout">Sair da conta</button>'+(teacher?'<hr><h2>Painel da professora</h2><div id="report"></div>':''):'<form id="auth"><label>E-mail<input type="email" name="email" autocomplete="email" required></label><label>Senha<input type="password" name="pass" minlength="6" required></label><button class="cta">Entrar</button> <button class="link" name="register">Criar conta</button><p id="authmsg" role="status"></p></form>')+'</div>';if(user){$('#logout').onclick=async()=>{await cloud.logout();user=null;teacher=false;for(const t of tracks) extras[t.slug]=Number(localStorage.getItem('cq-stage-'+t.slug))||0;edStage=Number(localStorage.getItem('cq-ed-stage'))||0;stage=Number(localStorage.getItem("cq-stage"))||0;render()};if(teacher)cloud.teacherReport().then(rows=>$('#report').textContent=rows.map(r=>r.display_name+' · '+r.class_name+' · '+r.stage+'/'+catalog.reduce((n,t)=>n+4*t.lessons.length,0)+' atividades · '+r.xp+' XP').join('\n')||'Nenhum estudante vinculado.');return}
$('#auth').onsubmit=async e=>{e.preventDefault();let f=e.target;try{let reg=e.submitter.name==='register';$('#authmsg').textContent='Aguarde…';let result=await cloud[reg?'signup':'login'](f.email.value,f.pass.value);if(!result){$('#authmsg').textContent='Confira seu e-mail para ativar a conta.';return}await init()}catch(err){$('#authmsg').textContent=err.message}}}
document.addEventListener('click',e=>{let b=e.target.closest('button');if(!b)return;if(b.dataset.go)location.hash=b.dataset.go;if(b.hasAttribute('data-start'))lesson(Math.min(stage,totalStages-1));if(b.dataset.unit!=null){const track=catalog.find(t=>t.slug===route)||catalog[0];lesson(Math.min(completedFor(track),4*(+b.dataset.unit)+3),track)}if(b.hasAttribute('data-daily')){let u=units[Math.floor(Date.now()/86400000)%units.length];open('<span class="eyebrow">TREINO EXTRA</span><h2>Desafio do dia</h2><p>'+u.quiz+'</p>'+u.quizOptions.map((s,i)=>'<button class="option" data-d="'+i+'">'+s+'</button>').join('')+'<p id="feedback"></p>');modal.querySelectorAll('[data-d]').forEach(bt=>bt.onclick=()=>$('#feedback').textContent=+bt.dataset.d===u.quizAnswer?'Acertou! '+u.quizFeedback:'Tente novamente. '+u.hint)}});
async function init(){user=await cloud.getUser();if(user){const progress=await cloud.getProgress();stage=progress.stage;edStage=progress.ed_stage;tracks.forEach((t,i)=>extras[t.slug]=progress.extra_stages?.[i]||0);teacher=await cloud.isTeacher()}render()}window.onhashchange=render;render();init().catch(()=>{});
