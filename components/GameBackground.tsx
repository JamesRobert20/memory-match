import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export function GameBackground() {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#FFB6C1', '#87CEEB']} // Pink to sky blue gradient
        style={styles.skyGradient}
      />
      <View style={styles.cloudContainer}>
        {/* Decorative clouds */}
        <View style={[styles.cloud, styles.cloud1]}>
          <View style={styles.cloudCircle} />
          <View style={[styles.cloudCircle, styles.cloudCircle2]} />
          <View style={[styles.cloudCircle, styles.cloudCircle3]} />
        </View>
        <View style={[styles.cloud, styles.cloud2]}>
          <View style={styles.cloudCircle} />
          <View style={[styles.cloudCircle, styles.cloudCircle2]} />
          <View style={[styles.cloudCircle, styles.cloudCircle3]} />
        </View>
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
  cloudContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  cloud: {
    position: 'absolute',
    flexDirection: 'row',
  },
  cloud1: {
    top: '10%',
    left: '10%',
  },
  cloud2: {
    top: '20%',
    right: '15%',
  },
  cloudCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  cloudCircle2: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginLeft: -15,
  },
  cloudCircle3: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    marginLeft: -15,
  },
}); 