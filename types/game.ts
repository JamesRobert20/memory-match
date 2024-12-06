export type CardType = {
  id: number;
  type: string;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
  category: 'flower' | 'tool' | 'insect' | 'weather';
};

export type GardenItem = {
  id: string;
  type: string;
  emoji: string;
  isPlanted: boolean;
  position?: { x: number; y: number };
};

export type Difficulty = 'easy' | 'medium' | 'hard';

export type GameStats = {
  bestScore: number;
  totalMatches: number;
  gardenItems: GardenItem[];
};

export type HazardType = 'pests' | null;

export interface Garden {
  plots: {
    id: string;
    soilState: 'empty' | 'tilled' | 'watered' | 'planted';
    plantedSeedId: string | null;
    plantedEmoji?: string;
    growthStage?: number;
    plantedTime?: number;
    hazard?: HazardType;
  }[];
  inventory: GardenItem[];
  tools: {
    wateringCan: boolean;
    trowel: boolean;
  };
} 