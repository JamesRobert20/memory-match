import { TouchableOpacity, StyleSheet } from "react-native";
import { Garden } from "@/types/game";
import { ThemedText } from "./ThemedText";

type Props = {
    plot: Garden['plots'][0];
    garden: Garden;
    handlePlantSeed: (plotId: string, seedId: string, seedEmoji: string) => void;
}

export default function GardenPlot({ plot, garden, handlePlantSeed }: Props) {
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
            {plot.soilState === 'planted' && plot.plantedEmoji && (
                <ThemedText style={styles.plantEmoji}>
                    {plot.plantedEmoji}
                </ThemedText>
            )}
        </TouchableOpacity>
    );
}

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
    plantEmoji: {
        fontSize: 20,
    }
});
