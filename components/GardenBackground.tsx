import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export function GardenBackground() {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#87CEEB', '#98FB98']} // Sky blue to light green
        style={styles.skyGradient}
      />
      <View style={styles.grassPattern}>
        {/* Decorative grass elements */}
        <View style={styles.grassBlade} />
        <View style={styles.grassBlade} />
        <View style={styles.grassBlade} />
      </View>
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
  },
  grassPattern: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  grassBlade: {
    width: 20,
    height: 30,
    backgroundColor: '#228B22',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
}); 