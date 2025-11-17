import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Temporizador from '../components/Temporizador';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home - Temporizador de Estudo</Text>
      <Temporizador />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex:1, padding:20},
  title: {fontSize:20, fontWeight:'700', marginBottom:12}
});
