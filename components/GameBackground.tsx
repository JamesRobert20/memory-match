import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export function GameBackground() {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#FFB6C1', '#87CEEB']} // Pink to sky blue gradient
        style={styles.skyGradient}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  skyGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  }
}); 