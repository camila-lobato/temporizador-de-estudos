import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;

export default function RegisterScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register (exemplo)</Text>

      <Pressable style={[styles.button]} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.buttonText}>Voltar ao Login</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex:1, justifyContent:'center', alignItems:'center', padding:20},
  title: {fontSize:24, marginBottom:20},
  button: {backgroundColor:'#007aff', paddingVertical:12, paddingHorizontal:20, borderRadius:8},
  buttonText: {color:'#fff', fontWeight:'700'}
});
