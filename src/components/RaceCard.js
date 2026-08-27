import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export const RaceCard = ({ race, onToggleComplete, onDelete }) => {
  return (
    <View style={[styles.card, race.completed && styles.cardCompleted]}>
      <View style={styles.info}>
        <Text style={[styles.trackName, race.completed && styles.textCompleted]}>
          🏎️ {race.trackName}
        </Text>
        <Text style={styles.details}>Categoria: {race.category}</Text>
        <Text style={styles.details}>Melhor Volta: {race.bestLap}</Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.button, race.completed ? styles.btnUndo : styles.btnDone]}
          onPress={() => onToggleComplete(race.id)}
        >
          <Text style={styles.btnText}>
            {race.completed ? 'Refazer' : 'Concluir'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.btnDelete]}
          onPress={() => onDelete(race.id)}
        >
          <Text style={styles.btnText}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: { backgroundColor: '#1E1E2C', padding: 16, borderRadius: 8, marginBottom: 12, flexDirection: 'row', justifyContent: 'space-between', borderLeftWidth: 5, borderLeftColor: '#FF4757' },
  cardCompleted: { borderLeftColor: '#2ED573', backgroundColor: '#16222F' },
  info: { flex: 1 },
  trackName: { fontSize: 18, fontWeight: 'bold', color: '#FFF' },
  details: { fontSize: 13, color: '#A4B0BE', marginTop: 2 },
  textCompleted: { textDecorationLine: 'line-through', color: '#747D8C' },
  actions: { justifyContent: 'center', gap: 6 },
  button: { paddingVertical: 6, paddingHorizontal: 12, borderRadius: 4, alignItems: 'center' },
  btnDone: { backgroundColor: '#2ED573' },
  btnUndo: { backgroundColor: '#FFA502' },
  btnDelete: { backgroundColor: '#FF4757' },
  btnText: { color: '#FFF', fontWeight: 'bold', fontSize: 12 }
});