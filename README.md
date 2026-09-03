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
TouchableOpacity para criação dos botões
Alert para exibição de mensagens
📂 Componentes do projeto

O código enviado é dividido principalmente em dois componentes:

RaceCard — responsável pela exibição de uma corrida.
RaceForm — responsável pelo cadastro de uma nova corrida.

Essa divisão facilita a organização e reutilização do código.

🧩 Explicação do código
🏁 RaceCard

O RaceCard é um componente responsável por mostrar os dados de uma corrida e disponibilizar ações para o usuário.

Importação das dependências
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';


Aqui são importados os recursos necessários do React Native:

View funciona como um container, semelhante a uma div no desenvolvimento web.
Text é utilizado para apresentar textos na tela.
StyleSheet permite criar os estilos dos componentes.
TouchableOpacity cria elementos que podem ser pressionados pelo usuário.
Recebendo as propriedades
export const RaceCard = ({ race, onToggleComplete, onDelete }) => {


O componente recebe três props:

race: contém os dados da corrida.
onToggleComplete: função utilizada para concluir ou refazer uma corrida.
onDelete: função utilizada para excluir uma corrida.

Um objeto race pode possuir, por exemplo:

{
  id: 1,
  trackName: 'Interlagos',
  category: 'GT3',
  bestLap: '1:24.500',
  completed: false
}

Exibição dos dados
<Text style={[styles.trackName, race.completed && styles.textCompleted]}>
  🏎️ {race.trackName}
</Text>


O nome do circuito é exibido utilizando race.trackName.

Também existe uma condição:

race.completed && styles.textCompleted


Isso significa que, se race.completed for true, o estilo textCompleted será aplicado.

Assim, uma corrida concluída recebe o efeito de texto riscado.

Informações adicionais
<Text style={styles.details}>Categoria: {race.category}</Text>
<Text style={styles.details}>Melhor Volta: {race.bestLap}</Text>


Esses dois elementos mostram a categoria da corrida e o tempo da melhor volta.

Por exemplo:

Categoria: GT3
Melhor Volta: 1:24.500

Botão Concluir / Refazer
<TouchableOpacity
  style={[styles.button, race.completed ? styles.btnUndo : styles.btnDone]}
  onPress={() => onToggleComplete(race.id)}
>


Esse botão possui dois comportamentos visuais.

Se a corrida ainda não estiver concluída:

race.completed === false


o botão recebe o estilo btnDone e mostra:

Concluir


Se já estiver concluída:

race.completed === true


o botão recebe btnUndo e mostra:

Refazer


A função:

onToggleComplete(race.id)


envia o id da corrida para o componente responsável pelo gerenciamento da lista.

Botão Excluir
<TouchableOpacity
  style={[styles.button, styles.btnDelete]}
  onPress={() => onDelete(race.id)}
>


Esse botão chama:

onDelete(race.id)


passando o ID da corrida para que ela possa ser removida.

O botão possui a cor vermelha, indicando uma ação de exclusão.

🎨 Estilização do RaceCard

Os estilos são definidos utilizando StyleSheet.create():

const styles = StyleSheet.create({


O card possui:

card: {
  backgroundColor: '#1E1E2C',
  padding: 16,
  borderRadius: 8,
  marginBottom: 12,
  flexDirection: 'row',
  justifyContent: 'space-between',
  borderLeftWidth: 5,
  borderLeftColor: '#FF4757'
}


Algumas propriedades importantes:

backgroundColor: define o fundo escuro.
padding: cria espaço interno.
borderRadius: arredonda os cantos.
flexDirection: 'row': coloca informações e botões lado a lado.
justifyContent: 'space-between': separa as informações dos botões.
borderLeftWidth: cria uma barra colorida na lateral do card.

Quando a corrida é concluída, o estilo:

cardCompleted


altera a cor da lateral para verde e também modifica o fundo.

📝 RaceForm

O RaceForm é responsável pelo cadastro de novas corridas.

Importação
import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert
} from 'react-native';


Além dos componentes básicos, é utilizado o useState.

O useState permite armazenar os valores digitados pelo usuário.

Estados do formulário
const [trackName, setTrackName] = useState('');
const [category, setCategory] = useState('');
const [bestLap, setBestLap] = useState('');


São criados três estados:

trackName: nome do circuito.
category: categoria da corrida.
bestLap: melhor tempo de volta.

Inicialmente todos possuem uma string vazia.

Campos de entrada

Um dos campos do formulário é:

<TextInput
  style={styles.input}
  placeholder="Nome do Circuito (ex: Interlagos)"
  placeholderTextColor="#747D8C"
  value={trackName}
  onChangeText={setTrackName}
/>


O TextInput permite que o usuário digite o nome do circuito.

O valor digitado é armazenado em:

trackName


através de:

onChangeText={setTrackName}


O mesmo conceito é utilizado nos campos de categoria e melhor volta.

✅ Validação do formulário

Quando o usuário toca no botão de cadastro, a função handleAdd é executada:

const handleAdd = () => {


Primeiro, o código verifica se algum campo está vazio:

if (!trackName.trim() || !category.trim() || !bestLap.trim()) {


O método trim() remove espaços desnecessários no início e no final do texto.

Se algum campo estiver vazio, o aplicativo apresenta:

Alert.alert(
  'Atenção',
  'Preencha todos os dados da pista!'
);


Dessa forma, o usuário é avisado de que precisa preencher todos os campos.

➕ Cadastro da corrida

Se todos os campos estiverem preenchidos, é chamada a função recebida através das props:

onAddRace(trackName, category, bestLap);


Essa função é responsável por enviar os dados para o componente principal da aplicação.

Depois do cadastro, os campos são limpos:

setTrackName('');
setCategory('');
setBestLap('');


Assim, o formulário fica pronto para cadastrar outra corrida.

🔄 Fluxo dos dados

O funcionamento dos componentes pode ser representado da seguinte maneira:

                 RACE MANAGER
                      │
          ┌───────────┴───────────┐
          │                       │
          ▼                       ▼
      RaceForm                RaceCard
          │                       │
          │                       │
    Usuário digita          Exibe corrida
          │                       │
          ▼                       ├── Concluir
    Validação                    ├── Refazer
          │                       └── Excluir
          ▼
     onAddRace()
          │
          ▼
    Lista de corridas
          │
          └──────────────► RaceCard


O RaceForm envia os dados para o componente principal através de onAddRace.

Depois que a corrida é adicionada à lista, o RaceCard recebe essa corrida através da propriedade race.

As ações de concluir, refazer e excluir também são enviadas para o componente principal através das funções onToggleComplete e onDelete.

📂 Estrutura sugerida

Uma organização possível para o projeto seria:

RaceManager/
│
├── App.js
│
├── components/
│   ├── RaceCard.js
│   └── RaceForm.js
│
├── package.json
└── README.md

App.js

Componente principal responsável por manter a lista de corridas e controlar as funções de adicionar, concluir e excluir.

components/RaceForm.js

Contém o formulário para cadastro das corridas.

components/RaceCard.js

Contém o card utilizado para exibir cada corrida.

README.md

Contém a documentação do projeto.

🚀 Como executar

Instale as dependências:

npm install


Para Android:

npx react-native run-android


Para iOS:

npx react-native run-ios


Caso o projeto utilize Expo:

npx expo start

🔮 Possíveis melhorias

Algumas funcionalidades podem ser adicionadas futuramente:

💾 Salvar as corridas utilizando AsyncStorage.
✏️ Permitir editar uma corrida.
🏆 Criar um ranking das melhores voltas.
🔎 Adicionar pesquisa por circuito.
🏁 Filtrar corridas por categoria.
📊 Criar estatísticas de desempenho.
📅 Adicionar data e horário da corrida.
🌐 Integrar uma API.
👤 Criar sistema de usuários.
🎯 Objetivo do projeto

O objetivo do Race Manager é criar uma aplicação simples para gerenciamento de corridas e, ao mesmo tempo, praticar conceitos fundamentais do React Native.

Entre os principais conceitos utilizados estão:

Componentização
Props
useState
Eventos
Formulários
Validação de dados
Renderização de componentes
Funções de callback
Estilização com StyleSheet
TouchableOpacity
TextInput
Alert
📄 Licença

Este projeto foi desenvolvido para fins de estudo e aprendizado.