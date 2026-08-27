import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@game_races_v1';

export const getRaces = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (error) {
    console.error('Erro ao buscar corridas:', error);
    return [];
  }
};

export const saveRaces = async (races) => {
  try {
    const jsonValue = JSON.stringify(races);
    await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
  } catch (error) {
    console.error('Erro ao salvar corridas:', error);
  }
};