import { useState, useEffect } from 'react';
import { Audio } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CardType, Difficulty, GameStats } from '@/types/game';
import { GARDEN_CARDS, DIFFICULTY_SETTINGS } from '@/constants/gameItems';
import { useGameContext } from '@/contexts/GameContext';

async function playSound(soundName: 'match' | 'fail' | 'flip') {
    try {
        const { sound } = await Audio.Sound.createAsync(
            soundName === 'match' ? require('@/assets/sounds/match.mp3') :
            soundName === 'fail' ? require('@/assets/sounds/fail.mp3') :
            require('@/assets/sounds/flip.mp3')
        );
        await sound.playAsync();
    } catch (error) {
        console.error('Error playing sound:', error);
    }
}

export const useGameLogic = (difficulty: Difficulty) => {
    const [cards, setCards] = useState<CardType[]>([]);
    const [flippedCards, setFlippedCards] = useState<number[]>([]);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(0);
    const [gameStarted, setGameStarted] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [gameWon, setGameWon] = useState(false);
    const { gameStats, setGameStats, setGarden } = useGameContext();

    // Timer logic
    useEffect(() => {
        if (timeLeft > 0 && gameStarted && !gameOver && !gameWon) {
            const timer = setInterval(() => {
                setTimeLeft(time => time - 1);
            }, 1000);
            return () => clearInterval(timer);
        } else if (timeLeft === 0 && gameStarted) {
            setGameOver(true);
        }
    }, [timeLeft, gameStarted, gameOver, gameWon]);

    // Check for win condition
    useEffect(() => {
        if (score === DIFFICULTY_SETTINGS[difficulty].pairs) {
            setGameWon(true);
            // Play win sound
            playSound('match');
        }
    }, [score, difficulty]);

    const initializeGame = () => {
        const cardPairs = getRandomCards(DIFFICULTY_SETTINGS[difficulty].pairs);
        const duplicatedCards = [...cardPairs, ...cardPairs];
        const shuffledCards = duplicatedCards
            .sort(() => Math.random() - 0.5)
            .map((card, index) => ({
                ...card,
                id: index,
                isFlipped: false,
                isMatched: false,
            })) as CardType[];

        setCards(shuffledCards);
        setFlippedCards([]);
        setScore(0);
        setTimeLeft(DIFFICULTY_SETTINGS[difficulty].timeLimit);
        setGameOver(false);
        setGameWon(false);
        setGameStarted(false);
    };

    const getRandomCards = (numPairs: number) => {
        const allCards = [
            ...GARDEN_CARDS.flowers,
            ...GARDEN_CARDS.tools,
            ...GARDEN_CARDS.insects,
            ...GARDEN_CARDS.weather,
        ];
        return allCards.sort(() => Math.random() - 0.5).slice(0, numPairs);
    };

    const handleCardPress = async (cardId: number) => {
        if (!gameStarted) {
            setGameStarted(true);
        }
        if (flippedCards.length === 2 || cards[cardId].isMatched || gameOver) return;

        // Play flip sound
        await playSound('flip');

        const newCards = [...cards];
        newCards[cardId].isFlipped = true;
        setCards(newCards);

        const newFlippedCards = [...flippedCards, cardId];
        setFlippedCards(newFlippedCards);

        if (newFlippedCards.length === 2) {
            checkMatch(newFlippedCards);
        }
    };

    const checkMatch = async (selectedCards: number[]) => {
        const [first, second] = selectedCards;

        setTimeout(async () => {
            if (cards[first].type === cards[second].type) {
                // Play match sound
                await playSound('match');

                const newCards = [...cards];
                newCards[first].isMatched = true;
                newCards[second].isMatched = true;
                setCards(newCards);
                setScore(score + 1);
                addToGarden(cards[first]);
            } else {
                // Play fail sound
                await playSound('fail');

                const newCards = [...cards];
                newCards[first].isFlipped = false;
                newCards[second].isFlipped = false;
                setCards(newCards);
            }
            setFlippedCards([]);
        }, 1000);
    };

    const addToGarden = (card: CardType) => {
        const newGardenItem = {
            id: Date.now().toString(),
            type: card.type,
            emoji: card.emoji,
            isPlanted: false,
        };
    
        setGameStats(prev => ({
            ...prev,
            totalMatches: prev.totalMatches + 1,
            gardenItems: [...prev.gardenItems, newGardenItem],
        }));
    
        setGarden(prev => ({
            ...prev,
            inventory: [...prev.inventory, newGardenItem]
        }));
    };

    return {
        cards,
        score,
        timeLeft,
        gameOver,
        gameWon,
        handleCardPress,
        initializeGame,
    };
}; 