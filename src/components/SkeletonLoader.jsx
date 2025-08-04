import React, { useState, useEffect } from 'react';
import { View, Animated, StyleSheet } from 'react-native';

const SkeletonLoader = ({ width = '80%' }) => {
  const animatedValue = useState(new Animated.Value(0))[0];

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, []);

  const opacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  });

  return (
    <Animated.View style={[styles.skeletonContainer, { opacity, width }]}>
      <View style={styles.skeletonLine} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  skeletonContainer: {
    height: 8,
    marginTop: 2,
  },
  skeletonLine: {
    height: '100%',
    backgroundColor: '#ddd',
    borderRadius: 15,
  },
});

export default SkeletonLoader;
