import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GardenScreen from '@/src/screens/GardenScreen';
import { GameStats } from '@/src/types/game';

export default function GardenIndex() {
  const [stats, setStats] = useState<GameStats>({
    bestScore: 0,
    totalMatches: 0,
    gardenItems: [],
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const savedStats = await AsyncStorage.getItem('gameStats');
      if (savedStats) {
        setStats(JSON.parse(savedStats));
      }
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <GardenScreen stats={stats} />
    </>
  );
} 