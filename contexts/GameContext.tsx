import React, { createContext, useContext, useState } from 'react';
import { Garden, GameStats } from '@/types/game';

interface GameContextType {
  garden: Garden;
  setGarden: (garden: Garden | ((prev: Garden) => Garden)) => void;
  gameStats: GameStats;
  setGameStats: (stats: GameStats | ((prev: GameStats) => GameStats)) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [garden, setGarden] = useState<Garden>({
    plots: Array.from({ length: 36 }, (_, i) => ({
      id: `plot-${i}`,
      soilState: 'empty',
      plantedSeedId: null
    })),
    inventory: [],
    tools: {
      wateringCan: true,
      trowel: true,
    },
  });

  const [gameStats, setGameStats] = useState<GameStats>({
    bestScore: 0,
    totalMatches: 0,
    gardenItems: [],
  });

  return (
    <GameContext.Provider value={{ garden, setGarden, gameStats, setGameStats }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGameContext() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGameContext must be used within a GameProvider');
  }
  return context;
} 