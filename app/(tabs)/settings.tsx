import React, { useState } from 'react';
import { StyleSheet, View, Switch, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Audio } from 'expo-av';
import { GameBackground } from '@/components/GameBackground';

export default function SettingsScreen() {
    const [soundEnabled, setSoundEnabled] = useState(true);
    const [hapticEnabled, setHapticEnabled] = useState(true);
    const insets = useSafeAreaInsets();

    const toggleSound = async () => {
        const newValue = !soundEnabled;
        setSoundEnabled(newValue);
        await AsyncStorage.setItem('soundEnabled', JSON.stringify(newValue));
        
        if (newValue) {
            await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
        }
    };

    const toggleHaptic = async () => {
        const newValue = !hapticEnabled;
        setHapticEnabled(newValue);
        await AsyncStorage.setItem('hapticEnabled', JSON.stringify(newValue));
    };

    const resetGameData = async () => {
        try {
            await AsyncStorage.multiRemove(['gameStats', 'gardenData']);
            // You could also reset the game context here if needed
        } catch (error) {
            console.error('Error resetting game data:', error);
        }
    };

    return (
        <View style={styles.container}>
            <GameBackground />
            
            <View style={[styles.content, { paddingTop: insets.top + 40 }]}>
                <LinearGradient
                    colors={['rgba(255,255,255,0.9)', 'rgba(255,255,255,0.7)']}
                    style={styles.titleContainer}>
                    <ThemedText type="title" style={styles.title}>Settings</ThemedText>
                </LinearGradient>

                <LinearGradient
                    colors={['rgba(255,255,255,0.9)', 'rgba(255,255,255,0.7)']}
                    style={styles.settingsContainer}>
                    <View style={styles.settingRow}>
                        <ThemedText>Sound Effects</ThemedText>
                        <Switch
                            value={soundEnabled}
                            onValueChange={toggleSound}
                            trackColor={{ false: '#767577', true: '#81b0ff' }}
                            thumbColor={soundEnabled ? '#4CAF50' : '#f4f3f4'}
                        />
                    </View>

                    <View style={styles.settingRow}>
                        <ThemedText>Haptic Feedback</ThemedText>
                        <Switch
                            value={hapticEnabled}
                            onValueChange={toggleHaptic}
                            trackColor={{ false: '#767577', true: '#81b0ff' }}
                            thumbColor={hapticEnabled ? '#4CAF50' : '#f4f3f4'}
                        />
                    </View>

                    <TouchableOpacity
                        style={styles.resetButton}
                        onPress={resetGameData}
                    >
                        <ThemedText style={styles.resetButtonText}>Reset Game Data</ThemedText>
                    </TouchableOpacity>
                </LinearGradient>
            </View>
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
    settingsContainer: {
        borderRadius: 15,
        padding: 20,
        gap: 20,
    },
    settingRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
    },
    resetButton: {
        backgroundColor: '#ff6b6b',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
    },
    resetButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});
