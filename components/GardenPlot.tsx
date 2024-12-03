import { TouchableOpacity, StyleSheet, View, Animated } from "react-native";
import { Garden } from "@/types/game";
import { ThemedText } from "./ThemedText";
import { useEffect, useState, useRef } from "react";

type Props = {
    plot: Garden['plots'][0];
    garden: Garden;
    handlePlantSeed: (plotId: string, seedId: string, seedEmoji: string) => void;
}

// Sparkle component
const Sparkle = ({ style }: { style: any }) => (
    <Animated.Text style={style}>✨</Animated.Text>
);

export default function GardenPlot({ plot, garden, handlePlantSeed }: Props) {
    const [growthStage, setGrowthStage] = useState(0);
    const growthProgress = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const sparkleOpacity = useRef(new Animated.Value(0)).current;
    const growthEmojis = ['🌱', '🌿', '🌸'];

    useEffect(() => {
        if (plot.soilState === 'planted') {
            // Animate growth progress over 60 seconds
            Animated.timing(growthProgress, {
                toValue: 1,
                duration: 60000,
                useNativeDriver: false,
            }).start();

            // Stage changes with animations at 1/3 and 2/3 of the duration
            const timer1 = setTimeout(() => {
                setGrowthStage(1);
                animateGrowth();
            }, 20000);

            const timer2 = setTimeout(() => {
                setGrowthStage(2);
                animateGrowth();
            }, 40000);

            return () => {
                growthProgress.setValue(0);
                clearTimeout(timer1);
                clearTimeout(timer2);
            };
        }
    }, [plot.soilState]);

    const animateGrowth = () => {
        // Scale animation
        Animated.sequence([
            Animated.timing(scaleAnim, {
                toValue: 1.2,
                duration: 200,
                useNativeDriver: true,
            }),
            Animated.timing(scaleAnim, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true,
            })
        ]).start();

        // Sparkle animation
        Animated.sequence([
            Animated.timing(sparkleOpacity, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true,
            }),
            Animated.delay(600),
            Animated.timing(sparkleOpacity, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true,
            })
        ]).start();
    };

    const rotateInterpolation = growthProgress.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
    });

    return (
        <TouchableOpacity
            style={[
                styles.plot,
                plot.soilState === 'planted' && styles.plantedPlot
            ]}
            onPress={() => {
                if (garden.inventory.length > 0 && plot.soilState === 'empty') {
                    const seedToPlant = garden.inventory[0];
                    handlePlantSeed(plot.id, seedToPlant.id, seedToPlant.emoji);
                }
            }}
        >
            {plot.soilState === 'planted' && (
                <View style={styles.plantContainer}>
                    {/* Progress ring - hide when growth is complete */}
                    {growthStage < 2 && (
                        <Animated.View
                            style={[
                                styles.progressRing,
                                {
                                    transform: [{ rotate: rotateInterpolation }],
                                    borderColor: getProgressColor(growthStage),
                                }
                            ]}
                        />
                    )}

                    {/* Plant emoji with scale animation */}
                    <Animated.View
                        style={[{
                            transform: [{ scale: scaleAnim }]
                        }]}
                    >
                        <ThemedText style={styles.plantEmoji}>
                            {growthEmojis[growthStage]}
                        </ThemedText>
                    </Animated.View>

                    {/* Sparkles */}
                    <Animated.View style={styles.sparkleContainer}>
                        <Sparkle style={[
                            styles.sparkle,
                            styles.sparkleTop,
                            { opacity: sparkleOpacity }
                        ]} />
                        <Sparkle style={[
                            styles.sparkle,
                            styles.sparkleRight,
                            { opacity: sparkleOpacity }
                        ]} />
                        <Sparkle style={[
                            styles.sparkle,
                            styles.sparkleBottom,
                            { opacity: sparkleOpacity }
                        ]} />
                        <Sparkle style={[
                            styles.sparkle,
                            styles.sparkleLeft,
                            { opacity: sparkleOpacity }
                        ]} />
                    </Animated.View>
                </View>
            )}
        </TouchableOpacity>
    );
}

const getProgressColor = (stage: number) => {
    switch (stage) {
        case 0: return '#90EE90'; // Light green
        case 1: return '#32CD32'; // Lime green
        case 2: return '#228B22'; // Forest green
        default: return '#90EE90';
    }
};

const styles = StyleSheet.create({
    plot: {
        width: 80,
        height: 80,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
    },
    plantedPlot: {
        backgroundColor: '#e8f5e9',
    },
    plantContainer: {
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        width: 60,
        height: 60,
    },
    progressRing: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        borderRadius: 30,
        borderWidth: 3,
        borderRightColor: 'transparent',
        borderBottomColor: 'transparent',
    },
    plantEmoji: {
        fontSize: 20
    },
    sparkleContainer: {
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
    sparkle: {
        position: 'absolute',
        fontSize: 16,
    },
    sparkleTop: {
        top: -20,
        left: '50%',
        transform: [{ translateX: -8 }],
    },
    sparkleRight: {
        top: '50%',
        right: -20,
        transform: [{ translateY: -8 }],
    },
    sparkleBottom: {
        bottom: -20,
        left: '50%',
        transform: [{ translateX: -8 }],
    },
    sparkleLeft: {
        top: '50%',
        left: -20,
        transform: [{ translateY: -8 }],
    },
});