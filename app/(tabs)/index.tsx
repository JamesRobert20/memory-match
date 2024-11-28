import { Stack } from 'expo-router';
import GameScreen from '@/src/screens/GameScreen';

export default function GameIndex() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <GameScreen />
    </>
  );
}
