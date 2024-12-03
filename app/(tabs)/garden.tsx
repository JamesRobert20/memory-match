import React from 'react';
import { StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useGameContext } from '@/contexts/GameContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import GardenPlot from '@/components/GardenPlot';

export default function GardenScreen() {
    const { garden, setGarden } = useGameContext();

    const handlePlantSeed = (plotId: string, seedId: string, seedEmoji: string) => {
        setGarden(prev => ({
            ...prev,
            plots: prev.plots.map(plot =>
                plot.id === plotId
                    ? { 
                        ...plot, 
                        plantedSeedId: seedId, 
                        plantedEmoji: seedEmoji,
                        soilState: 'planted' 
                    }
                    : plot
            ),
            inventory: prev.inventory.filter(seed => seed.id !== seedId)
        }));
    };

    const insets = useSafeAreaInsets();

    return (
        <ThemedView style={[styles.container, { paddingTop: insets.top + 40 }]}>
            <ThemedText type="title" style={styles.title}>Your Garden</ThemedText>

            <ScrollView style={styles.gardenScroll}>
                <View style={styles.gardenGrid}>
                    {garden.plots.map(plot =>
                        <GardenPlot
                            key={plot.id}
                            plot={plot}
                            garden={garden}
                            handlePlantSeed={handlePlantSeed}
                        />
                    )}
                </View>
            </ScrollView>

            <View style={styles.inventory}>
                <ThemedText type="subtitle">Seeds ({garden.inventory.length})</ThemedText>
                <View style={styles.seedGrid}>
                    {garden.inventory.map((seed) => (
                        <View key={seed.id} style={styles.seed}>
                            <ThemedText style={styles.seedEmoji}>{seed.emoji}</ThemedText>
                        </View>
                    ))}
                </View>
            </View>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        textAlign: 'center',
        marginBottom: 20,
    },
    gardenScroll: {
        flex: 1,
    },
    gardenGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 10,
        padding: 10,
    },
    inventory: {
        marginTop: 20,
    },
    seedGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
        marginTop: 10,
    },
    seed: {
        width: 50,
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    seedEmoji: {
        fontSize: 24,
    }
}); 