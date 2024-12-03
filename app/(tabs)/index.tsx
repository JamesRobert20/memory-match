import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Dimensions } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useGameLogic } from '@/hooks/useGameLogic';
import { Difficulty } from '@/types/game';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import GameCard from '@/components/GameCard';
import { useGameContext } from '@/contexts/GameContext';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { GameBackground } from '@/components/GameBackground';
import { LinearGradient } from 'expo-linear-gradient';

export default function TabOneScreen() {
    const [difficulty, setDifficulty] = useState<Difficulty>('medium');
    const { gameStats } = useGameContext();
    const {
        cards,
        score,
        timeLeft,
        gameOver,
        gameWon,
        handleCardPress,
        initializeGame,
    } = useGameLogic(difficulty);

    const insets = useSafeAreaInsets();

    return (
        <View style={styles.container}>
            <GameBackground />
            
            <View style={[styles.content, { paddingTop: insets.top + 40 }]}>
                <LinearGradient
                    colors={['rgba(255,255,255,0.9)', 'rgba(255,255,255,0.7)']}
                    style={styles.titleContainer}>
                    <ThemedText
                        type="title"
                        style={styles.title}
                    >
                        Memory Match Garden
                    </ThemedText>
                </LinearGradient>

                <LinearGradient
                    colors={['rgba(255,255,255,0.9)', 'rgba(255,255,255,0.7)']}
                    style={styles.controlsContainer}>
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
                        <TouchableOpacity
                            style={styles.difficultyButton}
                            onPress={initializeGame}
                        >
                            <View style={styles.buttonContent}>
                                <IconSymbol name="arrow.clockwise" size={20} color="#4CAF50" />
                                <ThemedText>NEW</ThemedText>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.statsContainer}>
                        <ThemedText type="subtitle">Matches: {score}</ThemedText>
                        <ThemedText type="subtitle">Time: {timeLeft}s</ThemedText>
                        <ThemedText type="subtitle">Best: {gameStats.bestScore}</ThemedText>
                    </View>
                </LinearGradient>

                <View style={styles.grid}>
                    {cards.map((card) => (
                        <GameCard
                            key={card.id}
                            card={card}
                            handleCardPress={handleCardPress}
                        />
                    ))}
                </View>
            </View>

            {(gameOver || gameWon) && (
                <View style={styles.gameOverContainer}>
                    <LinearGradient
                        colors={['rgba(255,255,255,0.95)', 'rgba(255,255,255,0.85)']}
                        style={styles.gameOverContent}>
                        <ThemedText type="title" style={styles.gameOverTitle}>
                            {gameWon ? '🎉 You Won! 🎉' : 'Game Over'}
                        </ThemedText>
                        <ThemedText style={styles.scoreText}>Final Score: {score}</ThemedText>
                        <TouchableOpacity style={styles.playAgainButton} onPress={initializeGame}>
                            <ThemedText style={styles.buttonText}>Play Again</ThemedText>
                        </TouchableOpacity>
                    </LinearGradient>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        padding: 20,
    },
    titleContainer: {
        borderRadius: 15,
        padding: 15,
        marginBottom: 20,
    },
    title: {
        textAlign: 'center',
        color: '#2E7D32',
    },
    controlsContainer: {
        borderRadius: 15,
        padding: 15,
        marginBottom: 20,
    },
    difficultyContainer: {
        flexDirection: 'row',
        marginBottom: 20,
        gap: 10,
        justifyContent: 'center',
    },
    difficultyButton: {
        padding: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#4CAF50',
        minWidth: 70,
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.8)',
    },
    selectedDifficulty: {
        backgroundColor: '#4CAF50',
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 10,
    },
    buttonContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    gameOverContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    gameOverContent: {
        padding: 30,
        borderRadius: 20,
        alignItems: 'center',
        gap: 15,
    },
    gameOverTitle: {
        color: '#2E7D32',
    },
    scoreText: {
        fontSize: 18,
        color: '#2E7D32',
    },
    playAgainButton: {
        backgroundColor: '#4CAF50',
        padding: 15,
        borderRadius: 8,
        minWidth: 120,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
}); 