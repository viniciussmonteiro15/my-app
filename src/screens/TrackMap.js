import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import * as Location from 'expo-location';

function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export default function TrackMap({ isDarkMode }) {
  const [location, setLocation] = useState(null);
  const [totalDistanceKm, setTotalDistanceKm] = useState(0);

  useEffect(() => {
    let subscription;

    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') return;

      subscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.BestForNavigation,
          distanceInterval: 5,
        },
        (newLocation) => {
          const { latitude, longitude } = newLocation.coords;

          setLocation((prevLoc) => {
            if (prevLoc) {
              const added = calculateDistance(
                prevLoc.latitude,
                prevLoc.longitude,
                latitude,
                longitude
              );
              setTotalDistanceKm((d) => d + added);
            }
            return { latitude, longitude };
          });
        }
      );
    })();

    return () => {
      if (subscription) subscription.remove();
    };
  }, []);

  const cardStyle = {
    backgroundColor: isDarkMode ? '#1E1E1E' : '#FFFFFF',
    borderColor: isDarkMode ? '#333333' : '#E0E0E0',
  };

  const textPrimary = { color: isDarkMode ? '#FFFFFF' : '#000000' };
  const textSecondary = { color: isDarkMode ? '#AAAAAA' : '#666666' };

  return (
    <View style={styles.container}>
      {/* Painel de Coordenadas GPS / Status */}
      <View style={[styles.mapBox, { backgroundColor: isDarkMode ? '#2A2A2A' : '#EAEAEA' }]}>
        <Text style={[styles.gpsTitle, textPrimary]}>📍 MONITORAMENTO GPS</Text>
        {location ? (
          <View style={styles.coordsBox}>
            <Text style={[styles.coordText, textSecondary]}>
              Lat: {location.latitude.toFixed(6)}
            </Text>
            <Text style={[styles.coordText, textSecondary]}>
              Long: {location.longitude.toFixed(6)}
            </Text>
          </View>
        ) : (
          <Text style={textSecondary}>Aguardando sinal do GPS...</Text>
        )}
      </View>

      {/* Contagem de Quilômetros */}
      <View style={[styles.card, cardStyle]}>
        <Text style={[styles.label, textSecondary]}>
          KM PERCORRIDOS EM TEMPO REAL
        </Text>
        <Text style={[styles.distanceText, textPrimary]}>
          {totalDistanceKm.toFixed(2)} <Text style={styles.unitText}>km</Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginTop: 10,
  },
  mapBox: {
    height: 120,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  gpsTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  coordsBox: {
    alignItems: 'center',
  },
  coordText: {
    fontSize: 12,
  },
  card: {
    marginTop: 12,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
  },
  label: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  distanceText: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  unitText: {
    fontSize: 16,
    fontWeight: 'normal',
  },
});