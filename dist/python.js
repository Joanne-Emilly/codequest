// Pyodide runs in a disposable worker in a frame with a unique, opaque origin.
const release = 'https://cdn.jsdelivr.net/pyodide/v0.27.7/full/';
let cancelCurrent;

function runPythonWorker() {
  self.onmessage = async ({ data }) => {
    const send = self.postMessage.bind(self);
    let output = '';
    let overflow = false;
    let ready = false;
    const append = line => {
      if (overflow) return;
      if (output.length + line.length > 32768) {
        overflow = true;
        throw new Error('A saída excedeu o limite de 32 mil caracteres.');
      }
      output += line + '\n';
    };
    try {
      importScripts(data.release + 'pyodide.js');
      const lines = data.stdin.replace(/\r\n/g, '\n').split('\n');
      if (lines.at(-1) === '') lines.pop();
      let lineIndex = 0;
      const runtime = await loadPyodide({
        indexURL: data.release,
        stdin: () => lines[lineIndex++] ?? undefined,
        stdout: append,
        stderr: append
      });
      output = '';
      ready = true;
      send({ type: 'executing' });
      await runtime.runPythonAsync(data.code, { filename: 'atividade.py' });
      if (overflow) throw new Error('A saída excedeu o limite de 32 mil caracteres.');
      send({ type: 'done', output });
    } catch (error) {
      const message = String(error?.message || error).slice(-3000);
      send({ type: 'error', message: ready ? output + message : 'Não foi possível carregar o Python. Confira sua conexão com a internet e tente novamente.' });
    }
  };
}

function runFrame() {
  window.addEventListener('message', event => {
    if (event.source !== parent || !event.ports[0]) return;
    const port = event.ports[0];
    let worker;
    try {
      const url = URL.createObjectURL(new Blob([event.data.source], { type: 'text/javascript' }));
      worker = new Worker(url);
      worker.onmessage = ({ data }) => port.postMessage(data);
      worker.onerror = () => port.postMessage({ type: 'error', message: 'Falha ao iniciar o interpretador Python. Verifique sua conexão e tente novamente.' });
      worker.postMessage(event.data.request);
      port.onmessage = () => worker.terminate();
    } catch {
      port.postMessage({ type: 'error', message: 'O navegador bloqueou a inicialização do laboratório.' });
    }
  }, { once: true });
}

export function stop() {
  cancelCurrent?.('Execução interrompida.');
}

export function execute(code, stdin = '') {
  stop();
  if (typeof code !== 'string' || typeof stdin !== 'string' || code.length > 30000 || stdin.length > 16000) {
    return Promise.reject(new Error('O limite é de 30 mil caracteres no código e 16 mil na entrada.'));
  }
  return new Promise((resolve, reject) => {
    let executing = false;
    let finished = false;
    const frame = document.createElement('iframe');
    frame.hidden = true;
    frame.setAttribute('sandbox', 'allow-scripts');
    frame.referrerPolicy = 'no-referrer';
    frame.title = 'Ambiente isolado do laboratório';
    const channel = new MessageChannel();
    let timer;
    const finish = (failure, value) => {
      if (finished) return;
      finished = true;
      clearTimeout(timer);
      channel.port1.postMessage('stop');
      channel.port1.close();
      frame.remove();
      cancelCurrent = undefined;
      if (failure) reject(new Error(value));
      else resolve(value);
    };
    cancelCurrent = message => finish(true, message);
    timer = setTimeout(() => finish(true, 'O carregamento do Python demorou demais. Confira a conexão e tente novamente.'), 60000);
    channel.port1.onmessage = ({ data }) => {
      if (data?.type === 'executing' && !executing) {
        executing = true;
        clearTimeout(timer);
        timer = setTimeout(() => finish(true, 'Tempo limite de 5 segundos excedido. Confira a condição de parada do seu código.'), 5000);
      } else if (data?.type === 'done' && typeof data.output === 'string') {
        finish(false, data.output.slice(0, 32768));
      } else if (data?.type === 'error') {
        finish(true, String(data.message).slice(0, 36000));
      }
    };
    const csp = "default-src 'none'; script-src 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net; worker-src blob:; connect-src https://cdn.jsdelivr.net; base-uri 'none'; form-action 'none'";
    frame.onload = () => frame.contentWindow.postMessage({
      source: '(' + runPythonWorker.toString() + ')()',
      request: { code, stdin, release }
    }, '*', [channel.port2]);
    frame.srcdoc = '<meta http-equiv="Content-Security-Policy" content="' + csp + '"><script>(' + runFrame.toString() + ')()<\/script>';
    document.body.append(frame);
  });
}
