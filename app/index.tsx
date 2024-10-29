import { View, Text, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';

export default function Mainindex() {
  const router = useRouter();
  const [isPressed, setIsPressed] = useState(false);

  return (
    <ImageBackground 
      source={require('../assets/images/7512145.jpg')} 
      style={styles.bg} 
      resizeMode="cover" // Ensures the image covers the entire background
    >
      <TouchableOpacity
        onPress={() => router.push('/(tab)')}
        onPressIn={() => setIsPressed(true)}
        onPressOut={() => setIsPressed(false)}
        style={[styles.buttonContainer, isPressed && styles.buttonPressed]}
      >
        <Text style={styles.title}>Go To Store</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    width: '100%',          // Make the background take full width
    height: '100%',          // Make the background take full height
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    left: 10,
    right: 10,
    bottom: 10,
    alignItems: 'center',
    backgroundColor: 'green',
    borderRadius: 5,
  },
  buttonPressed: {
    backgroundColor: '#004d00',
    transform: [{ scale: 0.98 }],
  },
  title: {
    fontSize: 20,
    color: 'white',
    paddingVertical: 12,
    paddingHorizontal: 24,
    textAlign: 'center',
  },
});
