export const estruturas = [
  {
    "title": "Referências e memória",
    "source": "Oliveira e Pereira, Estrutura de Dados (Arqué, 2023), tema 1, a partir da p. 8. Exemplos adaptados para Python.",
    "lesson": "No livro, ponteiros em C permitem trabalhar com endereços. Em Python, dois nomes podem se referir à mesma lista. Se uma equipe altera essa lista por um dos nomes, a mudança aparece pelo outro. Para testar uma alteração independente em uma lista de números, faça uma cópia.",
    "example": "dados = [4, 8]\natalho = dados\natalho[0] = 6\nprint(dados)",
    "question": "Qual lista aparece na saída?",
    "options": [
      "[4, 8]",
      "[6, 8]",
      "[4, 6]"
    ],
    "answer": 1,
    "quiz": "Qual expressão cria uma cópia de uma lista simples?",
    "quizOptions": [
      "dados.copy()",
      "atalho = dados",
      "dados[0]"
    ],
    "quizAnswer": 0,
    "practice": "Copie as notas, troque o primeiro valor da cópia por 9 e imprima os primeiros valores da original e da cópia na mesma linha.",
    "starter": "notas = [5, 8]\n",
    "hint": "Se a original mudar, confira se os dois nomes apontam para a mesma lista.",
    "expected": "5 9"
  },
  {
    "title": "Pilhas e filas",
    "source": "Oliveira e Pereira, Estrutura de Dados (Arqué, 2023), tema 2, a partir da p. 38. Exemplos adaptados para Python.",
    "lesson": "Uma pilha atende primeiro o último item inserido, como o comando desfazer. Uma fila atende primeiro quem chegou antes, como a fila da impressora. Em Python, append acrescenta ao fim, pop remove do fim e popleft remove do início de um deque.",
    "example": "from collections import deque\nfila = deque([\"A\", \"B\"])\npilha = [\"A\", \"B\"]\nprint(fila.popleft(), pilha.pop())",
    "question": "Qual pedido sai primeiro na fila do exemplo?",
    "options": [
      "B",
      "A",
      "Os dois juntos"
    ],
    "answer": 1,
    "quiz": "Você digitou A, B e C. Qual letra o primeiro desfazer remove?",
    "quizOptions": [
      "A",
      "B",
      "C"
    ],
    "quizAnswer": 2,
    "practice": "Insira os trabalhos 12, 15 e 21 nessa ordem em uma fila e em uma pilha. Imprima o primeiro retirado da fila e o primeiro retirado da pilha.",
    "starter": "from collections import deque\ntrabalhos = [12, 15, 21]\n",
    "hint": "Desenhe as duas saídas em lados opostos.",
    "expected": "12 21"
  },
  {
    "title": "Listas encadeadas",
    "source": "Oliveira e Pereira, Estrutura de Dados (Arqué, 2023), tema 3, a partir da p. 78. Exemplos adaptados para Python.",
    "lesson": "Cada nó guarda um valor e uma ligação para o próximo nó. Para inserir no início, faça o novo nó apontar para o antigo primeiro nó e atualize a cabeça. Para percorrer, siga as ligações até None.",
    "example": "cabeca = {\"valor\": \"B\", \"prox\": None}\ncabeca = {\"valor\": \"A\", \"prox\": cabeca}\nprint(cabeca[\"prox\"][\"valor\"])",
    "question": "O que identifica o fim dessa lista?",
    "options": [
      "Um nó vazio obrigatório",
      "O número zero",
      "A referência None"
    ],
    "answer": 2,
    "quiz": "Qual operação insere no início sem perder o restante?",
    "quizOptions": [
      "Ligar o novo nó à cabeça anterior",
      "Apagar a cabeça anterior",
      "Ordenar todos os nós"
    ],
    "quizAnswer": 0,
    "practice": "Percorra a lista fornecida, seguindo prox, e imprima cada valor em uma linha.",
    "starter": "no = {\"valor\": \"Sol\", \"prox\": {\"valor\": \"Lua\", \"prox\": None}}\n",
    "hint": "Depois de imprimir o valor, avance para no[\"prox\"].",
    "expected": "Sol\nLua"
  },
  {
    "title": "Ordenação por seleção",
    "source": "Oliveira e Pereira, Estrutura de Dados (Arqué, 2023), tema 4, a partir da p. 114. Exemplos adaptados para Python.",
    "lesson": "Para colocar etiquetas em ordem, encontre a menor etiqueta do trecho ainda desorganizado e troque-a com a primeira desse trecho. Depois de cada rodada, mais uma posição fica definitiva.",
    "example": "itens = [7, 3, 5]\nj = itens.index(min(itens))\nitens[0], itens[j] = itens[j], itens[0]\nprint(itens)",
    "question": "Após essa primeira troca, qual posição está garantida?",
    "options": [
      "A última",
      "A primeira",
      "Todas"
    ],
    "answer": 1,
    "quiz": "Na segunda rodada, onde procurar o menor elemento?",
    "quizOptions": [
      "Na lista inteira",
      "Somente na posição zero",
      "No trecho que começa na posição um"
    ],
    "quizAnswer": 2,
    "practice": "Faça duas rodadas de seleção sobre os códigos e imprima os três valores em ordem crescente, separados por espaços.",
    "starter": "codigos = [13, 4, 9]\n",
    "hint": "Mantenha um índice para o menor do trecho restante.",
    "expected": "4 9 13"
  },
  {
    "title": "Intercalação no Merge Sort",
    "source": "Oliveira e Pereira, Estrutura de Dados (Arqué, 2023), tema 5, a partir da p. 140. Exemplos adaptados para Python.",
    "lesson": "O Merge Sort divide a sequência, ordena as partes e intercala os resultados. Na intercalação, compare o primeiro valor ainda disponível de cada metade. Retire o menor e repita. Quando uma metade acabar, copie o restante da outra.",
    "example": "esq = [2, 7]\ndir = [4, 8]\nprint(min(esq[0], dir[0]))",
    "question": "Quais valores concorrem na primeira comparação?",
    "options": [
      "2 e 4",
      "7 e 8",
      "2 e 8"
    ],
    "answer": 0,
    "quiz": "A metade esquerda acabou. O que fazer com a direita?",
    "quizOptions": [
      "Descartar os itens",
      "Copiar os itens restantes na ordem",
      "Inverter a ordem"
    ],
    "quizAnswer": 1,
    "practice": "Intercale as duas listas já ordenadas usando índices e imprima todos os números em uma linha.",
    "starter": "esq = [1, 6, 8]\ndir = [2, 3]\n",
    "hint": "Avance apenas o índice da metade de onde veio o menor.",
    "expected": "1 2 3 6 8"
  },
  {
    "title": "Árvores e folhas",
    "source": "Oliveira e Pereira, Estrutura de Dados (Arqué, 2023), tema 6, a partir da p. 168. Exemplos adaptados para Python.",
    "lesson": "Uma árvore organiza os dados por relações entre pais e filhos. A raiz inicia o percurso. Uma folha não possui filhos. Na representação abaixo, cada chave é um nó e seu valor lista os filhos diretos.",
    "example": "filhos = {\"A\": [\"B\", \"C\"], \"B\": [], \"C\": []}\nprint(len(filhos[\"A\"]))",
    "question": "Quantas folhas há no exemplo?",
    "options": [
      "Uma",
      "Duas",
      "Três"
    ],
    "answer": 1,
    "quiz": "Uma árvore com apenas a raiz tem quantas folhas?",
    "quizOptions": [
      "Zero",
      "Duas",
      "Uma"
    ],
    "quizAnswer": 2,
    "practice": "Conte os nós sem filhos na árvore de setores fornecida e imprima o total.",
    "starter": "filhos = {\"Escola\": [\"Lab\", \"Sala\"], \"Lab\": [\"TI\"], \"TI\": [], \"Sala\": []}\n",
    "hint": "Verifique o tamanho de cada lista de filhos.",
    "expected": "2"
  },
  {
    "title": "Busca em árvore binária",
    "source": "Oliveira e Pereira, Estrutura de Dados (Arqué, 2023), tema 7, a partir da p. 192. Exemplos adaptados para Python.",
    "lesson": "Em uma árvore binária de busca com chaves distintas, as menores ficam na subárvore esquerda e as maiores na direita. Compare a chave procurada com a do nó atual para escolher o próximo ramo. Encontrar uma ligação vazia encerra a busca sem sucesso.",
    "example": "ramos = {8: (3, 12), 3: (None, None), 12: (None, None)}\nalvo = 12\nprint(ramos[8][1])",
    "question": "Procurando 3 a partir de 8, qual ramo seguir?",
    "options": [
      "Esquerdo",
      "Direito",
      "Ambos"
    ],
    "answer": 0,
    "quiz": "Por que podemos descartar um ramo?",
    "quizOptions": [
      "Toda árvore é completa",
      "As chaves seguem a propriedade de busca",
      "Toda folha vale zero"
    ],
    "quizAnswer": 1,
    "practice": "Busque 6 começando em 8. Imprima as chaves visitadas na mesma linha. Cada par contém os filhos esquerdo e direito.",
    "starter": "ramos = {8:(3,12), 3:(None,6), 6:(None,None), 12:(None,None)}\nalvo = 6\n",
    "hint": "Registre o nó antes de comparar e pare ao encontrar o alvo.",
    "expected": "8 3 6"
  },
  {
    "title": "Grafos e vizinhança",
    "source": "Oliveira e Pereira, Estrutura de Dados (Arqué, 2023), tema 8, a partir da p. 230. Exemplos adaptados para Python.",
    "lesson": "Um grafo representa conexões. Em um mapa de salas, cada sala pode ser um vértice e cada passagem, uma aresta. Em uma lista de adjacência, cada vértice guarda seus vizinhos. Em um corredor de mão dupla, registre os dois sentidos.",
    "example": "mapa = {\"A\":[\"B\"], \"B\":[\"A\",\"C\"], \"C\":[\"B\"]}\nprint(mapa[\"B\"])",
    "question": "Qual sala tem duas vizinhas?",
    "options": [
      "A",
      "B",
      "C"
    ],
    "answer": 1,
    "quiz": "Um novo corredor liga A a C nos dois sentidos. Quais listas mudam?",
    "quizOptions": [
      "Apenas A",
      "Apenas B",
      "A e C"
    ],
    "quizAnswer": 2,
    "practice": "Adicione uma passagem de mão dupla entre Lab e Sala. Imprima o número de vizinhos de Lab e de Sala, nessa ordem.",
    "starter": "mapa = {\"Lab\":[\"Hall\"], \"Hall\":[\"Lab\",\"Sala\"], \"Sala\":[\"Hall\"]}\n",
    "hint": "Acrescente uma entrada em cada extremidade do corredor.",
    "expected": "2 2"
  },
  {
    "title": "Busca em largura",
    "source": "Oliveira e Pereira, Estrutura de Dados (Arqué, 2023), tema 9, a partir da p. 260. Exemplos adaptados para Python.",
    "lesson": "Para explorar salas por distância a partir da entrada, use uma fila. Retire a primeira sala, examine os vizinhos e enfileire apenas os ainda não descobertos. Marque cada sala ao enfileirar para impedir duplicações em caminhos que se cruzam.",
    "example": "from collections import deque\nfila = deque([\"A\"])\nvistos = {\"A\"}\nfor vizinho in [\"B\",\"C\"]:\n    if vizinho not in vistos:\n        vistos.add(vizinho)\n        fila.append(vizinho)\nprint(*fila)",
    "question": "Qual estrutura preserva a visita por camadas?",
    "options": [
      "Pilha",
      "Fila",
      "Uma variável numérica"
    ],
    "answer": 1,
    "quiz": "Por que marcar ao enfileirar?",
    "quizOptions": [
      "Para ordenar alfabeticamente",
      "Para apagar arestas",
      "Para evitar incluir o mesmo vértice duas vezes"
    ],
    "quizAnswer": 2,
    "practice": "Percorra a rede em largura a partir de A, respeitando a ordem dos vizinhos. Imprima as salas visitadas em uma linha.",
    "starter": "from collections import deque\nrede = {\"A\":[\"B\",\"C\"], \"B\":[\"D\"], \"C\":[\"D\"], \"D\":[]}\n",
    "hint": "Use um conjunto para os descobertos e popleft para retirar o próximo.",
    "expected": "A B C D"
  }
];
