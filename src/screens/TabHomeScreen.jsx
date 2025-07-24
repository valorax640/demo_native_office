import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function TabHomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>🏠 Tab Home Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' ,backgroundColor: '#FFFFF0', },
  text: { fontSize: 24 },
});
