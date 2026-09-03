🏎️ Race Manager

Aplicativo mobile desenvolvido com React Native para gerenciamento de corridas e circuitos. O projeto permite cadastrar corridas, visualizar informações dos circuitos, marcar corridas como concluídas e excluir registros.

📱 Sobre o projeto

O Race Manager foi desenvolvido com foco em uma interface simples e objetiva para organizar informações de corridas.

Cada corrida possui:

🏁 Nome do circuito
🏎️ Categoria
⏱️ Melhor volta
✅ Status de conclusão
🗑️ Opção para exclusão

A aplicação utiliza componentes reutilizáveis para separar a responsabilidade de cadastro e exibição das corridas.

🛠️ Tecnologias utilizadas
React Native
React
JavaScript
useState para gerenciamento dos estados do formulário
StyleSheet para estilização
TouchableOpacity para ações e botões
Alert para validação dos dados
📂 Estrutura dos componentes
RaceCard

O componente RaceCard é responsável por apresentar as informações de uma corrida cadastrada.

Exemplo de informações exibidas:

🏎️ Interlagos
Categoria: GT3
Melhor Volta: 1:24.500


O componente também possui dois botões:

Concluir — altera o status da corrida para concluída.
Refazer — retorna uma corrida concluída para o estado pendente.
Excluir — remove a corrida da lista.

O visual do card muda quando a corrida está concluída, utilizando uma cor verde na lateral e o efeito de texto riscado.

RaceForm

O componente RaceForm é responsável pelo cadastro de novas corridas.

O formulário possui três campos:

Nome do Circuito
Categoria
Melhor Volta

Antes de cadastrar uma corrida, o componente verifica se todos os campos foram preenchidos.

Caso algum campo esteja vazio, uma mensagem de alerta é apresentada:

Atenção
Preencha todos os dados da pista!


Após o cadastro, os campos do formulário são automaticamente limpos.

🔄 Funcionamento

O fluxo básico da aplicação é:

Usuário
   │
   ▼
Preenche o formulário
   │
   ▼
CADASTRAR CORRIDA
   │
   ▼
Nova corrida adicionada
   │
   ▼
RaceCard
   │
   ├── Concluir
   │
   ├── Refazer
   │
   └── Excluir

🧩 Props utilizadas
RaceCard

O componente recebe três propriedades:

<RaceCard
  race={race}
  onToggleComplete={onToggleComplete}
  onDelete={onDelete}
/>

race

Objeto contendo os dados da corrida.

Exemplo:

{
  id: 1,
  trackName: 'Interlagos',
  category: 'GT3',
  bestLap: '1:24.500',
  completed: false
}

onToggleComplete

Função responsável por alterar o status da corrida entre concluída e pendente.

onToggleComplete(race.id);

onDelete

Função responsável por excluir a corrida.

onDelete(race.id);

RaceForm

O componente recebe a função:

<RaceForm onAddRace={onAddRace} />


Quando os dados são válidos, a função é chamada com:

onAddRace(trackName, category, bestLap);

🎨 Interface

A aplicação utiliza um tema escuro, com destaque para cores relacionadas ao automobilismo.

Elemento	Cor
Fundo do card	#1E1E2C
Fundo dos inputs	#2F3542
Vermelho principal	#FF4757
Verde	#2ED573
Laranja	#FFA502
Texto principal	#FFFFFF
Texto secundário	#A4B0BE

O vermelho é utilizado como cor principal da aplicação, enquanto o verde representa corridas concluídas.

🚀 Como executar

Certifique-se de ter um ambiente React Native configurado.

Depois, instale as dependências do projeto:

npm install


Para executar o projeto, utilize o comando correspondente à configuração da aplicação.

Android
npx react-native run-android

iOS
npx react-native run-ios


Para projetos utilizando Expo, os comandos podem ser diferentes, como npx expo start.

📋 Exemplo de uso

Um componente principal poderia utilizar os componentes desta forma:

<RaceForm onAddRace={handleAddRace} />

{races.map((race) => (
  <RaceCard
    key={race.id}
    race={race}
    onToggleComplete={handleToggleComplete}
    onDelete={handleDeleteRace}
  />
))}

🔮 Possíveis melhorias

Algumas funcionalidades podem ser adicionadas futuramente:

💾 Persistência dos dados com AsyncStorage ou banco de dados
✏️ Edição de corridas cadastradas
🏆 Ranking das melhores voltas
📊 Estatísticas de desempenho
🔎 Busca por circuito
🏁 Filtro por categoria
📅 Cadastro da data da corrida
🌐 Sincronização com uma API
👤 Sistema de usuários
🌙 Personalização de temas
👨‍💻 Objetivo

O projeto tem como objetivo servir como uma aplicação simples de gerenciamento de corridas, além de demonstrar conceitos importantes do desenvolvimento mobile com React Native, como:

Componentização
Props
Estado com useState
Eventos
Validação de formulários
Renderização de listas
Estilização com StyleSheet
Reutilização de componentes
📄 Licença

Este projeto pode ser utilizado para fins de estudo e aprendizado.