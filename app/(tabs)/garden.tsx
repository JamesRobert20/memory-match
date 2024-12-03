import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import GardenPlot from '@/components/GardenPlot';
import { useGameContext } from '@/contexts/GameContext';
import { GardenBackground } from '@/components/GardenBackground';
import { LinearGradient } from 'expo-linear-gradient';

export default function GardenScreen() {
  const { garden, setGarden } = useGameContext();
  const insets = useSafeAreaInsets();

  const handlePlantSeed = (plotId: string, seedId: string, seedEmoji: string) => {
    setGarden(prev => ({
      ...prev,
      plots: prev.plots.map(plot =>
        plot.id === plotId
          ? { 
              ...plot, 
              plantedSeedId: seedId, 
              plantedEmoji: seedEmoji,
              soilState: 'planted' 
          }
          : plot
      ),
      inventory: prev.inventory.filter(seed => seed.id !== seedId)
    }));
  };

  return (
    <View style={styles.container}>
      <GardenBackground />
      
      <ScrollView style={[styles.content, { paddingTop: insets.top + 40 }]}>
        <LinearGradient
          colors={['rgba(255,255,255,0.9)', 'rgba(255,255,255,0.7)']}
          style={styles.titleContainer}>
          <ThemedText type="title" style={styles.title}>Your Garden</ThemedText>
        </LinearGradient>

        <View style={styles.gardenGrid}>
          {garden.plots.map(plot =>
            <GardenPlot
              key={plot.id}
              plot={plot}
              garden={garden}
              handlePlantSeed={handlePlantSeed}
            />
          )}
        </View>
      </ScrollView>

      <LinearGradient
        colors={['rgba(255,255,255,0.9)', 'rgba(255,255,255,0.7)']}
        style={styles.inventory}>
        <ThemedText type="subtitle">Seeds ({garden.inventory.length})</ThemedText>
        <View style={styles.seedGrid}>
          {garden.inventory.map((seed) => (
            <View key={seed.id} style={styles.seed}>
              <ThemedText style={styles.seedEmoji}>{'🥜'}</ThemedText>
            </View>
          ))}
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  titleContainer: {
    margin: 20,
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    color: '#2E7D32',
  },
  gardenGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
    padding: 10,
  },
  inventory: {
    padding: 20,
    paddingBottom: 30,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  seedGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 10,
  },
  seed: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: '#4CAF50',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.8)',
  },
  seedEmoji: {
    fontSize: 20,
  }
}); 