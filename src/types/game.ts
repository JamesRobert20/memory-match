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