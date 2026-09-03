import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Modal,
  SafeAreaView,
  useColorScheme,
} from 'react-native';

import RaceCard from '../components/RaceCard';
import RaceForm from '../components/RaceForm';
import TrackMap from '../components/TrackMap';
import { getRaces, saveRaces } from '../storage/raceStorage';

export default function HomeScreen() {
  const systemTheme = useColorScheme();
  const [theme, setTheme] = useState(systemTheme || 'dark');
  const isDarkMode = theme === 'dark';

  const [races, setRaces] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    loadSavedRaces();
  }, []);

  const loadSavedRaces = async () => {
    const storedRaces = await getRaces();
    if (storedRaces) setRaces(storedRaces);
  };

  const handleAddRace = async (newRace) => {
    const updated = [newRace, ...races];
    setRaces(updated);
    await saveRaces(updated);
    setModalVisible(false);
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const dynamicStyles = {
    container: { backgroundColor: isDarkMode ? '#121212' : '#F5F5F5' },
    textPrimary: { color: isDarkMode ? '#FFFFFF' : '#000000' },
    textSecondary: { color: isDarkMode ? '#AAAAAA' : '#666666' },
    buttonBg: { backgroundColor: isDarkMode ? '#2A2A2A' : '#E0E0E0' },
  };

  return (
    <SafeAreaView style={[styles.container, dynamicStyles.container]}>
      {/* Botão de Alternar Modo Claro / Escuro no Topo */}
      <View style={styles.header}>
        <TouchableOpacity
          style={[styles.themeButton, dynamicStyles.buttonBg]}
          onPress={toggleTheme}
        >
          <Text style={dynamicStyles.textPrimary}>
            {isDarkMode ? '☀️ Modo Claro' : '🌙 Modo Escuro'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Componente isolado do Mapa + Contador de KM */}
      <TrackMap isDarkMode={isDarkMode} />

      {/* Lista de Corridas */}
      <View style={styles.listContainer}>
        <View style={styles.listHeader}>
          <Text style={[styles.sectionTitle, dynamicStyles.textPrimary]}>
            Minhas Corridas
          </Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={races}
          keyExtractor={(item, index) =>
            item.id ? item.id.toString() : index.toString()
          }
          renderItem={({ item }) => (
            <RaceCard race={item} isDarkMode={isDarkMode} />
          )}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <Text style={[styles.emptyText, dynamicStyles.textSecondary]}>
              Nenhuma corrida cadastrada ainda.
            </Text>
          }
        />
      </View>

      {/* Modal para Adicionar Corrida */}
      <Modal visible={modalVisible} animationType="slide">
        <RaceForm
          onSave={handleAddRace}
          onClose={() => setModalVisible(false)}
          isDarkMode={isDarkMode}
        />
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 10,
    alignItems: 'flex-end',
  },
  themeButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  listContainer: {
    flex: 1,
    marginHorizontal: 16,
    marginTop: 16,
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#3B82F6',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: 'bold',
    lineHeight: 24,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 14,
  },
});