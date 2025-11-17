import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login (exemplo)</Text>
      <Pressable style={styles.button} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.buttonText}>Entrar (vai para Home)</Text>
      </Pressable>

      <Pressable style={[styles.link]} onPress={() => navigation.navigate('Register')}>
        <Text style={{ color: '#007aff' }}>Ir para Register</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex:1, justifyContent:'center', alignItems:'center', padding:20},
  title: {fontSize:24, marginBottom:20},
  button: {backgroundColor:'#4caf50', paddingVertical:12, paddingHorizontal:20, borderRadius:8},
  buttonText: {color:'#fff', fontWeight:'700'},
  link: {marginTop:12}
});
