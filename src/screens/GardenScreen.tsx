import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, PanResponder } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { GardenItem } from '../types/game';

interface GardenScreenProps {
  stats: {
    gardenItems: GardenItem[];
  };
}

export default function GardenScreen({ stats }: GardenScreenProps) {
  const [selectedItem, setSelectedItem] = useState<GardenItem | null>(null);
  const [plantedItems, setPlantedItems] = useState<GardenItem[]>(
    stats.gardenItems.filter(item => item.isPlanted)
  );
  const [draggedItem, setDraggedItem] = useState<{ x: number; y: number } | null>(null);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gestureState) => {
      if (selectedItem) {
        setDraggedItem({
          x: gestureState.moveX,
          y: gestureState.moveY,
        });
      }
    },
    onPanResponderRelease: (_, gestureState) => {
      if (selectedItem) {
        handlePlantItem({ x: gestureState.moveX, y: gestureState.moveY });
        setDraggedItem(null);
      }
    },
  });

  const handlePlantItem = (location: { x: number; y: number }) => {
    if (!selectedItem) return;

    const newPlantedItem = {
      ...selectedItem,
      isPlanted: true,
      position: location,
    };

    setPlantedItems([...plantedItems, newPlantedItem]);
    setSelectedItem(null);
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Your Garden</ThemedText>
      
      <View style={styles.gardenArea} {...panResponder.panHandlers}>
        {plantedItems.map((item) => (
          <View
            key={item.id}
            style={[
              styles.plantedItem,
              {
                left: item.position?.x,
                top: item.position?.y,
              },
            ]}
          >
            <ThemedText style={styles.emojiText}>{item.emoji}</ThemedText>
          </View>
        ))}
        {draggedItem && selectedItem && (
          <View
            style={[
              styles.plantedItem,
              styles.draggingItem,
              {
                left: draggedItem.x,
                top: draggedItem.y,
              },
            ]}
          >
            <ThemedText style={styles.emojiText}>{selectedItem.emoji}</ThemedText>
          </View>
        )}
      </View>

      <View style={styles.inventory}>
        <ThemedText type="subtitle">Inventory</ThemedText>
        <View style={styles.inventoryGrid}>
          {stats.gardenItems
            .filter(item => !item.isPlanted)
            .map((item) => (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.inventoryItem,
                  selectedItem?.id === item.id && styles.selectedInventoryItem,
                ]}
                onPress={() => setSelectedItem(item)}
              >
                <ThemedText style={styles.emojiText}>{item.emoji}</ThemedText>
              </TouchableOpacity>
            ))}
        </View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gardenArea: {
    width: '80%',
    height: '50%',
    position: 'relative',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    overflow: 'hidden',
  },
  plantedItem: {
    width: '20%',
    height: '20%',
    position: 'absolute',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emojiText: {
    fontSize: 24,
  },
  inventory: {
    width: '80%',
    marginTop: 20,
  },
  inventoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  inventoryItem: {
    width: '20%',
    height: '20%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  draggingItem: {
    position: 'absolute',
    opacity: 0.7,
  },
  selectedInventoryItem: {
    borderColor: '#007AFF',
    borderWidth: 2,
  },
}); 