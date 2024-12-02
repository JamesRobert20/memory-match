export const GARDEN_CARDS = {
  flowers: [
    { type: 'rose', emoji: '🌹', category: 'flower' },
    { type: 'sunflower', emoji: '🌻', category: 'flower' },
    { type: 'tulip', emoji: '🌷', category: 'flower' },
    { type: 'cherry_blossom', emoji: '🌸', category: 'flower' },
  ],
  tools: [
    { type: 'seedling', emoji: '🌱', category: 'tool' },
    { type: 'potted_plant', emoji: '🪴', category: 'tool' },
    { type: 'watering_can', emoji: '💧', category: 'tool' },
  ],
  insects: [
    { type: 'butterfly', emoji: '🦋', category: 'insect' },
    { type: 'ladybug', emoji: '🐞', category: 'insect' },
    { type: 'bee', emoji: '🐝', category: 'insect' },
  ],
  weather: [
    { type: 'sun', emoji: '☀️', category: 'weather' },
    { type: 'cloud', emoji: '☁️', category: 'weather' },
    { type: 'rain', emoji: '🌧️', category: 'weather' },
  ],
};

export const DIFFICULTY_SETTINGS = {
  easy: { pairs: 6, timeLimit: 60 },
  medium: { pairs: 8, timeLimit: 45 },
  hard: { pairs: 12, timeLimit: 30 },
}; 