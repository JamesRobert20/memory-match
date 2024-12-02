import { Animated, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { CardType } from "@/types/game";
import { ThemedText } from "./ThemedText";
import { useRef, useEffect } from "react";

type Props = {
    card: CardType;
    handleCardPress: (id: number) => void;
}

export default function GameCard({ card, handleCardPress }: Props) {
    const flipAnimation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.spring(flipAnimation, {
            toValue: card.isFlipped ? 1 : 0,
            friction: 8,
            tension: 10,
            useNativeDriver: true,
        }).start();
    }, [card.isFlipped]);

    const frontInterpolate = flipAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg']
    });

    const backInterpolate = flipAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: ['180deg', '360deg']
    });

    return (
        <TouchableOpacity
            key={card.id}
            style={[
                styles.card,
                (card.isFlipped || card.isMatched) ? styles.cardFlipped : null
            ]}
            onPress={() => handleCardPress(card.id)}
            disabled={card.isFlipped || card.isMatched}
        >
            <Animated.View
                style={[
                    styles.cardInner
                ]}
            >
                {/* Front of card */}
                <Animated.View
                    style={[
                        styles.cardFace,
                        styles.cardFront,
                        { transform: [{ rotateY: frontInterpolate }] }
                    ]}
                >
                    <ThemedText style={styles.cardText}>🌿</ThemedText>
                </Animated.View>

                {/* Back of card */}
                <Animated.View
                    style={[
                        styles.cardFace,
                        styles.cardBack,
                        { transform: [{ rotateY: backInterpolate }] }
                    ]}
                >
                    <ThemedText style={styles.cardText}>{card.emoji}</ThemedText>
                </Animated.View>
            </Animated.View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
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
        shadowRadius: 3.84
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
    cardFace: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backfaceVisibility: 'hidden',
    },
    cardFront: {
        backgroundColor: '#fff',
        borderRadius: 8,
    },
    cardBack: {
        backgroundColor: '#e8f5e9',
        borderRadius: 8,
        transform: [{ rotateY: '180deg' }],
    },
});
