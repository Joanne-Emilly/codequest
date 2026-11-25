export const tracks = [
  {
    "slug": "algoritmos",
    "name": "Técnicas de programação",
    "offset": 68,
    "unit": {
      "title": "Fluxo de decisão",
      "source": "Lógica e Técnicas de Programação, p. 170",
      "lesson": "Uma condição decide qual bloco executar. Na oficina, uma equipe avança quando soma pelo menos 20 pontos.",
      "example": "pontos = 20\nprint(pontos >= 20)",
      "question": "Com 19 pontos, qual valor a comparação produz?",
      "options": [
        "True",
        "False",
        "19"
      ],
      "answer": 1,
      "quiz": "Qual comparação inclui exatamente o limite?",
      "quizOptions": [
        "pontos > 20",
        "pontos == 19",
        "pontos >= 20"
      ],
      "quizAnswer": 2,
      "practice": "Para cada pontuação, imprima em uma linha se ela alcança o limite de 20.",
      "starter": "for pontos in [18, 20, 24]:\n    # Escreva a comparação\n    pass",
      "expected": "False\nTrue\nTrue",
      "hint": "Teste primeiro o caso de quem fez exatamente 20 pontos."
    }
  },
  {
    "slug": "dados",
    "name": "Banco de Dados",
    "offset": 72,
    "unit": {
      "title": "Filtrar registros",
      "source": "Banco de Dados, p. 96",
      "lesson": "Uma tabela organiza registros em linhas. Em SQL, WHERE seleciona as linhas que satisfazem uma condição. Em Python podemos aplicar o mesmo critério a registros de uma lista.",
      "example": "SELECT nome FROM alunos WHERE turma = '2A';",
      "question": "Que parte da consulta define o filtro?",
      "options": [
        "FROM",
        "SELECT",
        "WHERE"
      ],
      "answer": 2,
      "quiz": "Duas alunas da turma 2A têm o mesmo nome. Quantas linhas a consulta devolve para elas?",
      "quizOptions": [
        "Duas",
        "Uma",
        "Zero"
      ],
      "quizAnswer": 0,
      "practice": "Percorra os pares e imprima apenas os nomes da turma 2A, na ordem recebida.",
      "starter": "alunos = [('Lia','2A'), ('Rui','1A'), ('Bia','2A')]\nfor nome, turma in alunos:\n    pass",
      "expected": "Lia\nBia",
      "hint": "Compare turma com a string \"2A\" antes de chamar print."
    }
  },
  {
    "slug": "redes",
    "name": "Gerenciamento de Redes",
    "offset": 76,
    "unit": {
      "title": "Detectar uma falha",
      "source": "Gerenciamento de Redes de Computadores, p. 132",
      "lesson": "O monitor registra se cada equipamento respondeu à verificação. Uma ausência de resposta pede investigação e pode ter diversas causas.",
      "example": "sala = [True, False, True]",
      "question": "Que amostra merece investigação?",
      "options": [
        "True",
        "False",
        "Todas indicam falha"
      ],
      "answer": 1,
      "quiz": "Uma ausência de resposta basta para concluir que o cabo quebrou?",
      "quizOptions": [
        "Sim, sempre",
        "Só em Wi-Fi",
        "É preciso investigar a causa"
      ],
      "quizAnswer": 2,
      "practice": "Conte as verificações sem resposta e imprima o total.",
      "starter": "respostas = [False, True, False, False]\n# Conte os valores False",
      "expected": "3",
      "hint": "Uma lista aceita count(False)."
    }
  },
  {
    "slug": "seguranca",
    "name": "Segurança e Auditoria de Sistemas",
    "offset": 80,
    "unit": {
      "title": "Permissões por papel",
      "source": "Segurança e Auditoria de Sistemas, p. 92",
      "lesson": "O controle de acesso associa ações a papéis. No exemplo da escola, estudantes consultam as próprias notas e docentes também lançam notas.",
      "example": "acoes = {'estudante': ['consultar'], 'docente': ['consultar', 'lancar']}",
      "question": "Quem pode lançar notas pela regra acima?",
      "options": [
        "Docente",
        "Estudante",
        "Ambos"
      ],
      "answer": 0,
      "quiz": "Qual registro ajuda a auditar um lançamento?",
      "quizOptions": [
        "Senha de quem lançou",
        "Autor, ação e horário",
        "Cor da tela"
      ],
      "quizAnswer": 1,
      "practice": "Consulte o mapa e imprima se cada papel tem autorização para lançar notas.",
      "starter": "acoes = {'estudante': ['consultar'], 'docente': ['consultar', 'lancar']}\nfor papel in ['estudante', 'docente']:\n    pass",
      "expected": "False\nTrue",
      "hint": "O operador in verifica se uma ação pertence à lista daquele papel."
    }
  },
  {
    "slug": "servicos",
    "name": "Projetos e Serviços de TI",
    "offset": 84,
    "unit": {
      "title": "Triagem de chamados",
      "source": "Gerenciamento de Projetos e Serviços de TI, p. 78",
      "lesson": "Um incidente interrompe ou degrada um serviço. A equipe tenta restabelecê-lo e pode abrir uma investigação de problema para descobrir a causa das interrupções repetidas.",
      "example": "Incidente: o projetor deixou de exibir a aula.",
      "question": "Qual é o objetivo imediato ao atender esse incidente?",
      "options": [
        "Comprar outro projetor",
        "Restabelecer a projeção",
        "Encerrar o contrato"
      ],
      "answer": 1,
      "quiz": "Que trabalho procura a causa de interrupções recorrentes?",
      "quizOptions": [
        "Gestão de problemas",
        "Cadastro de turmas",
        "Inventário de livros"
      ],
      "quizAnswer": 0,
      "practice": "Imprima os identificadores dos chamados abertos para compor a fila da equipe.",
      "starter": "chamados = [(12,'aberto'), (13,'resolvido'), (14,'aberto')]\nfor numero, estado in chamados:\n    pass",
      "expected": "12\n14",
      "hint": "Filtre pelo estado antes de imprimir o número."
    }
  },
  {
    "slug": "riscos",
    "name": "Governança e Gestão de Risco",
    "offset": 88,
    "unit": {
      "title": "Priorizar riscos",
      "source": "Governança e Gestão de Risco, p. 84",
      "lesson": "Nesta oficina usamos uma escala de 1 a 3 para probabilidade e impacto. O produto das duas notas ajuda a equipe a escolher quais riscos discutir primeiro.",
      "example": "prioridade = 2 * 3",
      "question": "Qual é a prioridade de um risco com notas 2 e 3?",
      "options": [
        "5",
        "6",
        "9"
      ],
      "answer": 1,
      "quiz": "Qual ação reduz o impacto de perder o arquivo do projeto?",
      "quizOptions": [
        "Ignorar o risco",
        "Renomear o arquivo",
        "Manter uma cópia recuperável"
      ],
      "quizAnswer": 2,
      "practice": "Calcule o produto das notas de cada risco e imprima a maior prioridade.",
      "starter": "riscos = [(1, 3), (2, 2), (3, 3)]\n# Calcule os produtos",
      "expected": "9",
      "hint": "Compare os produtos usando max."
    }
  },
  {
    "slug": "imagens",
    "name": "Visão Computacional",
    "offset": 92,
    "unit": {
      "title": "Segmentar uma faixa de pixels",
      "source": "Processamento de Imagens e Visão Computacional, p. 66",
      "lesson": "Uma imagem em tons de cinza pode ser representada por intensidades. Nesta missão, a segmentação marca com 1 os pixels com intensidade a partir de 128 e com 0 os demais.",
      "example": "Intensidades: 10, 200 → Classes: 0, 1",
      "question": "Qual classe recebe o pixel 128?",
      "options": [
        "0",
        "1",
        "128"
      ],
      "answer": 1,
      "quiz": "O que muda se o limiar subir para 180?",
      "quizOptions": [
        "Mais pixels alcançam o limiar",
        "Todos ficam na classe 1",
        "Menos pixels podem alcançar o limiar"
      ],
      "quizAnswer": 2,
      "practice": "Classifique os quatro pixels e imprima uma classe por linha.",
      "starter": "pixels = [127, 128, 200, 0]\nfor valor in pixels:\n    pass",
      "expected": "0\n1\n1\n0",
      "hint": "Use valor >= 128 dentro de uma decisão."
    }
  },
  {
    "slug": "ingles",
    "name": "Língua Inglesa",
    "offset": 96,
    "unit": {
      "title": "Escrever instruções para a tela",
      "source": "Língua Inglesa, unidade 2, p. 59",
      "lesson": "Ao escrever, considere o leitor e a finalidade. Para orientar uma pessoa em uma interface, escolha um verbo de ação e indique o objeto da ação.",
      "example": "Save your file. → Salve seu arquivo.",
      "question": "Qual instrução pede para abrir um arquivo?",
      "options": [
        "Close the file.",
        "Open the file.",
        "Save the file."
      ],
      "answer": 1,
      "quiz": "Que frase orienta a pessoa a tentar outra vez?",
      "quizOptions": [
        "Try again.",
        "File saved.",
        "Good morning."
      ],
      "quizAnswer": 0,
      "practice": "Complete o dicionário com as instruções Open the file. e Try again. Imprima as mensagens na ordem abrir, repetir.",
      "starter": "mensagens = {'abrir': '', 'repetir': ''}\nfor chave in ['abrir', 'repetir']:\n    print(mensagens[chave])",
      "expected": "Open the file.\nTry again.",
      "hint": "Observe a inicial maiúscula e o ponto final nas duas instruções."
    }
  },
  {
    "slug": "ihc",
    "name": "Interação Humano-Computador",
    "offset": 100,
    "unit": {
      "title": "Avaliar uma tarefa",
      "source": "Interação Humano-Computador, p. 138",
      "lesson": "Num teste de interface, observe se a pessoa consegue cumprir uma tarefa, como encontrar sua próxima atividade. A taxa de conclusão divide o número de sucessos pelo total de tentativas.",
      "example": "3 sucessos em 4 tentativas → 75%",
      "question": "Que observação mede conclusão?",
      "options": [
        "Cor favorita",
        "Marca do celular",
        "Se a pessoa chegou à atividade"
      ],
      "answer": 2,
      "quiz": "Se duas de cinco pessoas concluíram a tarefa, qual é a taxa?",
      "quizOptions": [
        "20%",
        "40%",
        "50%"
      ],
      "quizAnswer": 1,
      "practice": "Calcule a porcentagem de sucessos e imprima o resultado como um inteiro, sem o símbolo de porcentagem.",
      "starter": "resultados = [True, True, False, True, True]\n# Calcule a porcentagem",
      "expected": "80",
      "hint": "Divida a contagem de True pelo tamanho da lista e multiplique por 100."
    }
  }
];
