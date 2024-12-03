import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Dimensions } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useGameLogic } from '@/hooks/useGameLogic';
import { Difficulty } from '@/types/game';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import GameCard from '@/components/GameCard';
import { useGameContext } from '@/contexts/GameContext';

export default function GameScreen() {
    const [difficulty, setDifficulty] = useState<Difficulty>('medium');
    const { gameStats } = useGameContext();
    const {
        cards,
        score,
        timeLeft,
        gameOver,
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

    const insets = useSafeAreaInsets();

    return (
        <ThemedView style={[styles.container, { paddingTop: insets.top + 40 }]}>
            <ThemedText type="title" style={styles.title}>Memory Match Garden</ThemedText>

            {renderDifficultySelector()}

            <View style={styles.statsContainer}>
                <ThemedText type="subtitle">Matches: {score}</ThemedText>
                <ThemedText type="subtitle">Time: {timeLeft}s</ThemedText>
                <ThemedText type="subtitle">Best: {gameStats.bestScore}</ThemedText>
            </View>

            <View style={styles.grid}>
                {cards.map((card) => (
                    <GameCard
                        key={card.id}
                        card={card}
                        handleCardPress={handleCardPress}
                    />
                ))}
            </View>

            {gameOver && (
                <View style={styles.gameOverContainer}>
                    <ThemedText type="title" style={{ color: 'white' }}>Game Over!</ThemedText>
                    <ThemedText style={{ color: 'white' }}>Final Score: {score}</ThemedText>
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
        textAlign: 'center',
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
    }
}); 