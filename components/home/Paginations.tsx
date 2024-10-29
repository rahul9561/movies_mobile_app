import { View, StyleSheet } from 'react-native';
import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Paginations({ item }) {
  return (
    <View style={styles.container}>
      {item.map((_, index) => (
        <Ionicons
          key={index}
          name="ellipse"
          style={styles.dot}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  dot: {
    fontSize: 12,         // Adjust dot size
    color: '#007AFF',     // Dot color
    marginHorizontal: 4,  // Spacing between dots
  },
});
