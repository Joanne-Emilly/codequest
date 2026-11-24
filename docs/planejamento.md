# CodeQuest — Aprenda Python com a Profª Joanne

Estudantes do Ensino Médio Integrado aprendem a decompor problemas, seguir instruções e transformar um roteiro em um programa Python. O primeiro ciclo oferece três unidades do Mundo 1. O mapa de expansão inclui 80 unidades.

## Percursos de navegação planejados

| Pessoa | Percurso | Resultado esperado |
| --- | --- | --- |
| Estudante | Início → unidade disponível → conteúdo → exercício → quiz → prática | Registrar aprendizagem, receber XP e abrir a próxima etapa |
| Estudante em revisão | Histórico → atividade com erro → dica → nova tentativa | Consolidar o conceito com feedback |
| Professora | Autenticação → turma → estudante → histórico | Identificar dificuldades a partir das tentativas registradas |

## Arquitetura e requisitos

A apresentação utiliza HTML semântico, CSS responsivo e módulos JavaScript. O currículo separa explicações, exemplos, alternativas, dicas e saídas esperadas da interface. O laboratório deve executar Python em um Worker isolado, com interrupção e limite de tempo. O servidor deve decidir o acesso às turmas e a atribuição de XP. Em avaliações oficiais, a validação dos programas exige um executor isolado no servidor.

O percurso precisa aceitar teclado, indicar sucesso e erro por texto, manter o foco acessível e respeitar a preferência por movimento reduzido. Em uma tela estreita, os controles devem permanecer alcançáveis e as linhas de código devem rolar dentro do editor.

## Regras de progressão

- Registre cada tentativa e a atividade correspondente. A repetição pode ajudar na revisão.
- Conceda o XP de conclusão apenas uma vez por pessoa e atividade. Use uma restrição única no banco de dados para proteger a operação em acessos simultâneos.
- Libere a próxima atividade após concluir seus pré-requisitos. Permita retomar unidades anteriores.
- Registre dicas utilizadas e respostas incorretas para orientar intervenções pedagógicas.
- Restrinja os relatórios pela matrícula do estudante e pela responsabilidade da professora sobre sua turma.

## Modelo de dados para expansão

| Relação | Cardinalidade e integridade |
| --- | --- |
| Perfil, matrícula e turma | Cada matrícula referencia um perfil e uma turma. O par deve ser único. Cada turma tem uma professora responsável. |
| Mundo, unidade e atividade | Um mundo reúne unidades ordenadas. Uma unidade reúne atividades ordenadas. A posição é única dentro do elemento pai. |
| Questão, alternativa e dica | Cada questão pertence a uma atividade. Cada alternativa ou dica pertence a uma questão. Dicas têm ordem definida. |
| Desafio e caso de teste | Cada caso define entrada e saída para um único desafio. Separe casos públicos e privados. |
| Tentativa e submissão | Cada tentativa tem autor, atividade, instante e resultado. Uma submissão armazena código e resultados dos testes associados à tentativa. |
| Progresso e XP | O progresso tem uma linha por estudante e atividade. Cada recompensa de conclusão tem identificador único. |
| Conquista, competição e resultado | Use tabelas de associação para participantes e medalhas recebidas. Classifique apenas resultados verificados. |

## Sistema visual

A identidade combina títulos em tipografia sem serifa, destaques vermelhos, painéis escuros, amarelo para recompensas e a personagem da Profª Joanne. O mapa identifica cada etapa com texto e ícone. Mensagens de erro devem indicar uma ação concreta para o estudante tentar novamente.

## Etapas de desenvolvimento

| Ordem | Entrega | Verificação para avançar |
| --- | --- | --- |
| 1 | Planejamento e matriz | Conferir progressão, pré-requisitos e papéis |
| 2 | Identidade, personagem e componentes | Revisar reconhecimento, contraste e leitura no celular |
| 3 | MVP das primeiras unidades | Percorrer conteúdo, exercício, quiz e prática |
| 4 | Laboratório Python | Verificar saída, erro, interrupção e tempo limite |
| 5 | Contas e progresso remoto | Testar acesso entre contas e persistência em outro aparelho |
| 6 | Painel docente | Conferir dados reais e isolamento entre turmas |
| 7 | Gamificação | Conferir idempotência de XP, conquistas e sequência de dias |
| 8 | Treinamento competitivo | Validar os desafios em relação ao edital disponibilizado |
| 9 | Publicação | Testar o percurso completo com teclado, celular e desktop |

## Fontes das unidades iniciais

Os problemas de equipes, sensores, moedas e oficinas são autorais. Nas unidades 01–03, os exemplos de comentários, atribuição e operações aritméticas tomam como referência o tutorial oficial; as saídas de terminal usam a documentação de print.

- [Introdução informal ao Python](https://docs.python.org/pt-br/3/tutorial/introduction.html)
- [Função print](https://docs.python.org/pt-br/3/library/functions.html#print)
