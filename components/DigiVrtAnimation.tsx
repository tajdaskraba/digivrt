import { useEffect } from 'react';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withDelay,
  withTiming,
  withSequence,
  withRepeat,
} from 'react-native-reanimated';

export function DigiVrtAnimation() {
  const rotateY = useSharedValue(0);
  const scale = useSharedValue(1);

  useEffect(() => {
    scale.value = withRepeat(
      withSequence(
        withDelay(500, withTiming(1.2, { duration: 300 })),
        withTiming(1, { duration: 300 })
      ),
      2,
      false
    );
  }, []);

  const startAnimation = () => {
    rotateY.value = withTiming(rotateY.value === 0 ? 180 : 0, { duration: 300 });
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotateY: `${rotateY.value}deg` }, { scale: scale.value }],
  }));

  return (
    <TouchableOpacity onPress={startAnimation}>
      <Animated.View style={animatedStyle}>
        <Image source={require('@/assets/images/digivrt-no-bg.png')} style={styles.digiVrtImage} />
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  digiVrtImage: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
  },
});
