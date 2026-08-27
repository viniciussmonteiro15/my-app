import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';

export const RaceForm = ({ onAddRace }) => {
  const [trackName, setTrackName] = useState('');
  const [category, setCategory] = useState('');
  const [bestLap, setBestLap] = useState('');

  const handleAdd = () => {
    if (!trackName.trim() || !category.trim() || !bestLap.trim()) {
      Alert.alert('Atenção', 'Preencha todos os dados da pista!');
      return;
    }
    onAddRace(trackName, category, bestLap);
    setTrackName('');
    setCategory('');
    setBestLap('');
  };

  return (
    <View style={styles.form}>
      <Text style={styles.formTitle}>NOVA CORRIDA / CIRCUITO</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome do Circuito (ex: Interlagos)"
        placeholderTextColor="#747D8C"
        value={trackName}
        onChangeText={setTrackName}
      />
      <TextInput
        style={styles.input}
        placeholder="Categoria (ex: Street, GT3, F1)"
        placeholderTextColor="#747D8C"
        value={category}
        onChangeText={setCategory}
      />
      <TextInput
        style={styles.input}
        placeholder="Melhor Volta (ex: 1:24.500)"
        placeholderTextColor="#747D8C"
        value={bestLap}
        onChangeText={setBestLap}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
        <Text style={styles.addButtonText}>CADASTRAR CORRIDA</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  form: { backgroundColor: '#1E1E2C', padding: 16, borderRadius: 8, marginBottom: 16 },
  formTitle: { color: '#FF4757', fontWeight: 'bold', marginBottom: 12, fontSize: 14 },
  input: { backgroundColor: '#2F3542', color: '#FFF', borderRadius: 6, padding: 10, marginBottom: 10, borderWidth: 1, borderColor: '#57606F' },
  addButton: { backgroundColor: '#FF4757', padding: 12, borderRadius: 6, alignItems: 'center' },
  addButtonText: { color: '#FFF', fontWeight: 'bold' }
});