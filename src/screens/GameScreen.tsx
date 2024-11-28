import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Dimensions, Animated } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useGameLogic } from '../hooks/useGameLogic';
import { Difficulty } from '../types/game';

export default function GameScreen() {
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const {
    cards,
    score,
    timeLeft,
    gameOver,
    stats,
    handleCardPress,
    initializeGame,
  } = useGameLogic(difficulty);

  const renderDifficultySelector = () => (
    <View style={styles.difficultyContainer}>
      {(['easy', 'medium', 'hard'] as Difficulty[]).map((level) => (
        <TouchableOpacity
          key={level}
          style={[
            styles.difficultyButton,
            difficulty === level && styles.selectedDifficulty,
          ]}
          onPress={() => setDifficulty(level)}
        >
          <ThemedText>{level.toUpperCase()}</ThemedText>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>Memory Match Garden</ThemedText>
      
      {renderDifficultySelector()}
      
      <View style={styles.statsContainer}>
        <ThemedText type="subtitle">Matches: {score}</ThemedText>
        <ThemedText type="subtitle">Time: {timeLeft}s</ThemedText>
        <ThemedText type="subtitle">Best: {stats.bestScore}</ThemedText>
      </View>
      
      <View style={styles.grid}>
        {cards.map((card) => (
          <TouchableOpacity
            key={card.id}
            style={[
              styles.card,
              card.isFlipped || card.isMatched ? styles.cardFlipped : null
            ]}
            onPress={() => handleCardPress(card.id)}
            disabled={card.isFlipped || card.isMatched}
          >
            <Animated.View
              style={[
                styles.cardInner,
                {
                  transform: [
                    {
                      rotateY: card.isFlipped || card.isMatched ? '180deg' : '0deg',
                    },
                  ],
                },
              ]}
            >
              <ThemedText style={styles.cardText}>
                {card.isFlipped || card.isMatched ? card.emoji : '🌿'}
              </ThemedText>
            </Animated.View>
          </TouchableOpacity>
        ))}
      </View>

      {gameOver && (
        <View style={styles.gameOverContainer}>
          <ThemedText type="title">Game Over!</ThemedText>
          <ThemedText>Final Score: {score}</ThemedText>
          <TouchableOpacity style={styles.button} onPress={initializeGame}>
            <ThemedText>Play Again</ThemedText>
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity style={styles.button} onPress={initializeGame}>
        <ThemedText>New Game</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
} 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    marginBottom: 20,
  },
  difficultyContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 10,
  },
  difficultyButton: {
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  selectedDifficulty: {
    backgroundColor: '#4CAF50',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 20,
  },
  card: {
    width: Dimensions.get('window').width * 0.2,
    height: Dimensions.get('window').width * 0.2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  cardFlipped: {
    backgroundColor: '#e8f5e9',
  },
  cardInner: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backfaceVisibility: 'hidden',
  },
  cardText: {
    fontSize: 24,
  },
  gameOverContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
  },
}); 