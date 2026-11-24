// Atividades autorais do Mundo 1. Índices de respostas começam em zero.
export const units = [
  {
    title: "Pensamento computacional",
    lesson: "Como descobrir quantos notebooks a turma precisa? Primeiro, divida o problema em partes. Conte as equipes, descubra quantos aparelhos cada uma usa e combine os resultados. Essa estratégia se chama decomposição. Se todas as equipes usam a mesma quantidade, você encontrou um padrão. A cor dos notebooks pode ficar de fora do cálculo: escolher os detalhes que importam é abstrair.",
    example: "# Quatro equipes usam dois notebooks cada.\nequipes = 4\npor_equipe = 2\nprint(equipes * por_equipe)",
    question: "Qual informação você precisa para calcular quantos notebooks reservar?",
    options: ["A cor dos notebooks", "O número de equipes e de aparelhos por equipe", "O nome de cada participante"],
    answer: 1,
    feedback: "Multiplique a quantidade de equipes pela quantidade de aparelhos de cada equipe.",
    quiz: "Ao dividir a organização de uma feira em inscrições, salas e horários, você está praticando…",
    quizOptions: ["Decomposição", "Repetição", "Depuração"],
    quizAnswer: 0,
    quizFeedback: "Cada parte pode ser resolvida separadamente e depois integrada ao planejamento.",
    hint: "Pense em três grupos iguais. O que é mais curto: somar a quantidade de cada grupo ou multiplicar?",
    hints: ["Desenhe uma caixa para cada equipe.", "Grupos com o mesmo tamanho permitem usar multiplicação.", "Em Python, o asterisco (*) multiplica dois números."],
    practice: "Três equipes vão testar quatro sensores cada. Calcule o total usando Python e mostre apenas o número no terminal.",
    starter: "# Calcule o total de sensores.\nequipes = 3\nsensores_por_equipe = 4\n",
    expected: "12"
  },
  {
    title: "Lógica de programação",
    lesson: "No placar de um jogo, a ordem das instruções muda o resultado. Primeiro registre o saldo, depois some a recompensa e, por último, mostre o novo valor. O sinal = guarda o resultado da expressão à direita no nome que aparece à esquerda. Para acompanhar o programa à mão, anote quanto vale cada variável após cada linha.",
    example: "pontos = 10          # saldo inicial\npontos = pontos + 5  # guarda o novo saldo\nprint(pontos)        # mostra 15",
    question: "Se o programa mostrar os pontos antes de somar o bônus, qual saldo aparecerá no exemplo?",
    options: ["5", "15", "10"],
    answer: 2,
    feedback: "Antes da atualização, a variável ainda guarda os 10 pontos iniciais.",
    quiz: "Uma fase começa com 8 moedas. O código executa moedas = moedas - 3 e depois print(moedas). O que aparece?",
    quizOptions: ["3", "5", "8"],
    quizAnswer: 1,
    quizFeedback: "O lado direito calcula 8 menos 3. Só então o resultado 5 é guardado em moedas.",
    hint: "A pontuação final depende do saldo inicial e das duas recompensas. Mostre o resultado depois das atualizações.",
    hints: ["Liste os três valores do problema.", "Somar o bônus atualiza o saldo do jogo.", "Use print(pontos) após calcular o saldo final."],
    practice: "Sua equipe começa com 12 pontos e ganha dois bônus, de 8 e 5 pontos. Atualize a variável pontos e mostre apenas o saldo final.",
    starter: "pontos = 12\n# Some os dois bônus e mostre o saldo.\n",
    expected: "25"
  },
  {
    title: "Algoritmos, pseudocódigo e fluxogramas",
    lesson: "Um algoritmo é uma sequência de passos que resolve um problema. Antes de programar, escreva esses passos em português simples: esse é o pseudocódigo. Em um fluxograma, as setas mostram o caminho entre as etapas e um losango representa uma decisão. Para conferir a sequência, percorra as setas com um exemplo real e observe em que saída você chega.",
    example: "# Pseudocódigo: contar pacotes → calcular itens → mostrar total\npacotes = 3\nitens = pacotes * 5\nprint(itens)",
    question: "Para mostrar o total de itens de uma encomenda, qual sequência faz sentido?",
    options: ["Calcular o total → descobrir a quantidade → mostrar", "Mostrar o total → calcular → contar", "Contar os pacotes → calcular o total → mostrar"],
    answer: 2,
    feedback: "O cálculo depende da contagem, e a exibição depende do resultado do cálculo.",
    quiz: "Qual etapa de um fluxograma deve ter duas saídas, uma para sim e outra para não?",
    quizOptions: ["Mostrar a mensagem final", "Perguntar se há vagas", "Registrar o nome"],
    quizAnswer: 1,
    quizFeedback: "A pergunta define qual caminho o algoritmo deve seguir.",
    hint: "Siga as setas do roteiro na ordem. Em Python, cada print pode mostrar uma etapa em uma linha.",
    hints: ["Leia os três passos do roteiro de cima para baixo.", "Uma sequência de print mantém a ordem das linhas.", "Coloque cada palavra entre aspas para tratá-la como texto."],
    practice: "Traduza o roteiro de uma oficina para Python. Mostre as palavras Preparar, Testar e Apresentar, nessa ordem, cada uma em sua própria linha e com inicial maiúscula.",
    starter: "# Escreva uma instrução para cada etapa da oficina.\n",
    expected: "Preparar\nTestar\nApresentar"
  },
{
  "title": "Decisões e repetição",
  "source": "Marcos Roberto Ribeiro, Python Avançado (IFMG, 2022), §§ 1.5–1.6, pp. 24–30.",
  "lesson": "No laboratório, cada sensor envia uma temperatura. Para contar os alertas, comece com zero, percorra as leituras com for e some um apenas quando o if reconhecer uma temperatura alta. Experimente trocar >= por > e observe o que acontece com o valor da fronteira.",
  "example": "alertas = 0\nfor temperatura in [28, 30, 32]:\n    if temperatura >= 30:\n        alertas += 1\nprint(alertas)",
  "question": "Por que a leitura 30 entra na contagem?",
  "options": [
    "Porque é a segunda leitura",
    "Porque >= inclui a igualdade",
    "Porque for arredonda números"
  ],
  "answer": 1,
  "quiz": "Quantos alertas o exemplo registra se o limite subir para 32?",
  "quizOptions": [
    "Zero",
    "Dois",
    "Um"
  ],
  "quizAnswer": 2,
  "quizFeedback": "Só a leitura 32 alcança o novo limite.",
  "practice": "Conte quantas das notas 5, 7, 9 e 6 atingem pelo menos 7. Imprima a quantidade.",
  "starter": "notas = [5, 7, 9, 6]\n",
  "hint": "Marque primeiro, no papel, quais notas passam no teste. Inicialize o contador antes do laço.",
  "expected": "2"
},
{
  "title": "Funções e retorno",
  "source": "Marcos Roberto Ribeiro, Python Avançado (IFMG, 2022), §§ 1.8.1–1.8.3, pp. 34–35.",
  "lesson": "Uma função permite repetir um cálculo com dados diferentes. O parâmetro recebe o valor de cada chamada. Use return para entregar o resultado ao restante do programa. Assim, quem chama a função decide se vai mostrar, guardar ou somar esse resultado.",
  "example": "def dobro(valor):\n    return valor * 2\n\npontos = dobro(4) + dobro(3)\nprint(pontos)",
  "question": "Quanto vale dobro(3)?",
  "options": [
    "3",
    "9",
    "6"
  ],
  "answer": 2,
  "quiz": "Se uma função só executa print(6) e termina, qual valor ela devolve?",
  "quizOptions": [
    "None",
    "6",
    "Uma lista"
  ],
  "quizAnswer": 0,
  "quizFeedback": "Sem return explícito, a função devolve None.",
  "practice": "Crie a função saldo(inicial, gasto) que devolve a diferença. Mostre em linhas separadas os resultados para (20, 7) e (9, 4).",
  "starter": "def saldo(inicial, gasto):\n    pass\n",
  "hint": "Guarde o print para o ponto de chamada. Dentro da função, devolva a diferença.",
  "expected": "13\n5"
},
{
  "title": "Classes e objetos",
  "source": "Marcos Roberto Ribeiro, Python Avançado (IFMG, 2022), § 2.2, pp. 55–56.",
  "lesson": "Imagine duas equipes com placares independentes. Uma classe descreve o que toda equipe guarda e faz. Ao criar cada objeto, __init__ inicia seu placar. Em um método, self indica qual equipe recebeu a chamada. Por isso atualizar uma equipe não altera o saldo da outra.",
  "example": "class Equipe:\n    def __init__(self):\n        self.pontos = 0\n    def marcar(self):\n        self.pontos += 1\n\nazul = Equipe()\nverde = Equipe()\nazul.marcar()\nprint(azul.pontos, verde.pontos)",
  "question": "O que o exemplo imprime?",
  "options": [
    "1 1",
    "1 0",
    "0 1"
  ],
  "answer": 1,
  "quiz": "Qual expressão cria outra equipe com placar próprio?",
  "quizOptions": [
    "outra = azul",
    "outra = azul.pontos",
    "outra = Equipe()"
  ],
  "quizAnswer": 2,
  "quizFeedback": "Uma chamada à classe cria outra instância. A atribuição outra = azul compartilha o mesmo objeto.",
  "practice": "Implemente um contador de visitas com um método visitar. Crie dois contadores, registre duas visitas no primeiro e uma no segundo. Mostre os totais separados por espaço.",
  "starter": "class Contador:\n    def __init__(self):\n        self.total = 0\n    def visitar(self):\n        pass\n",
  "hint": "Use self.total dentro do método e crie o segundo contador com uma nova chamada a Contador().",
  "expected": "2 1"
},
{
  "title": "Salvando dados em JSON",
  "source": "Marcos Roberto Ribeiro, Python Avançado (IFMG, 2022), § 3.5, pp. 102–108.",
  "lesson": "Uma lista de atividades pode ser salva em um arquivo para leitura posterior. O módulo json converte dicionários e listas em texto estruturado. Com um arquivo aberto em modo w, dump grava os dados. Para reconstruí-los, abra o arquivo em modo r e use load. No laboratório do CodeQuest, faça a gravação e a leitura na mesma execução.",
  "example": "import json\nwith open('turma.json', 'w') as arquivo:\n    json.dump({'equipes': 4}, arquivo)\nwith open('turma.json') as arquivo:\n    turma = json.load(arquivo)\nprint(turma['equipes'])",
  "question": "Qual operação reconstrói o dicionário a partir do arquivo?",
  "options": [
    "json.load(arquivo)",
    "json.dump(turma, arquivo)",
    "print(arquivo)"
  ],
  "answer": 0,
  "quiz": "O que acontece ao abrir um arquivo existente no modo w?",
  "quizOptions": [
    "Os dados sempre vão para o fim",
    "O conteúdo anterior é apagado",
    "O arquivo fica somente para leitura"
  ],
  "quizAnswer": 1,
  "quizFeedback": "O modo w começa uma nova escrita, truncando o conteúdo anterior.",
  "practice": "Grave o dicionário abaixo em placar.json. Leia-o novamente e mostre a soma dos pontos das duas equipes.",
  "starter": "import json\nplacar = {'azul': 8, 'verde': 5}\n",
  "hint": "Use dois blocos with. Calcule a soma com o dicionário obtido pelo load.",
  "expected": "13"
},
{
  "title": "Eventos e ações de uma interface",
  "source": "Marcos Roberto Ribeiro, Python Avançado (IFMG, 2022), §§ 4.2–4.4, pp. 121–127.",
  "lesson": "Em uma interface gráfica, o clique é um evento. No livro, um sinal de botão é ligado a um método que responde ao clique. Aqui vamos simular essa ligação no terminal. O dicionário abaixo guarda a função sem executá-la. Quando chega o evento, os parênteses chamam a função associada.",
  "example": "def saudar():\n    print('Olá, turma!')\n\nacoes = {'entrar': saudar}\nacoes['entrar']()",
  "question": "Por que guardar saudar sem parênteses?",
  "options": [
    "Para apagar a função",
    "Para transformá-la em texto",
    "Para chamar a função quando o evento ocorrer"
  ],
  "answer": 2,
  "quiz": "Se você retirar os parênteses da última linha, o que acontece?",
  "quizOptions": [
    "A função é consultada, mas a saudação não é impressa",
    "O evento ocorre duas vezes",
    "A função é apagada"
  ],
  "quizAnswer": 0,
  "quizFeedback": "A consulta devolve a função. Os parênteses executam seu corpo.",
  "practice": "Crie as funções abrir e fechar para imprimir Laboratório aberto e Laboratório fechado. Associe cada função ao evento correspondente e processe a sequência fornecida.",
  "starter": "eventos = ['abrir', 'fechar', 'abrir']\n",
  "hint": "Monte um dicionário de funções e, dentro de um for, chame a ação correspondente à chave atual.",
  "expected": "Laboratório aberto\nLaboratório fechado\nLaboratório aberto"
}
];
