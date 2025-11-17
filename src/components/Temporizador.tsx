import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Alert, Keyboard, Vibration, Platform } from 'react-native';

/**
 * Temporizador de estudo (TypeScript)
 * - Iniciar / Pausar / Resetar
 * - Input de minutos (numeric)
 * - Exibir MM:SS
 * - Muda cor quando < 60s
 * - Alert + Vibrate ao finalizar
 * - Contabiliza sessoesCompletas e tempoTotalEstudado (segundos)
 */

const Temporizador: React.FC = () => {
  const [tempoInicialEmMinutos, setTempoInicialEmMinutos] = useState<string>('25');
  const [segundosRestantes, setSegundosRestantes] = useState<number>(25 * 60);
  const [ativo, setAtivo] = useState<boolean>(false);
  const [sessoesCompletas, setSessoesCompletas] = useState<number>(0);
  const [tempoTotalEstudado, setTempoTotalEstudado] = useState<number>(0);

  const intervaloRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const minutos = parseInt(tempoInicialEmMinutos, 10);
    if (!isNaN(minutos) && minutos >= 0) {
      setSegundosRestantes(minutos * 60);
    }
  }, [tempoInicialEmMinutos]);

  useEffect(() => {
    if (intervaloRef.current) {
      clearInterval(intervaloRef.current as any);
      intervaloRef.current = null;
    }

    if (ativo) {
      intervaloRef.current = setInterval(() => {
        setSegundosRestantes(prev => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }

    return () => {
      if (intervaloRef.current) {
        clearInterval(intervaloRef.current as any);
        intervaloRef.current = null;
      }
    };
  }, [ativo]);

  useEffect(() => {
    if (segundosRestantes === 0 && ativo) {
      setAtivo(false);
      if (intervaloRef.current) {
        clearInterval(intervaloRef.current as any);
        intervaloRef.current = null;
      }

      const minutos = parseInt(tempoInicialEmMinutos, 10);
      const segundosDaSessao = isNaN(minutos) ? 0 : minutos * 60;

      setSessoesCompletas(prev => prev + 1);
      setTempoTotalEstudado(prev => prev + segundosDaSessao);

      Alert.alert('Sessão finalizada', 'Parabéns! Você concluiu a sessão.');
      if (Platform.OS !== 'web') {
        Vibration.vibrate(1000);
      }
    }
  }, [segundosRestantes, ativo, tempoInicialEmMinutos]);

  function handleIniciar() {
    if (segundosRestantes <= 0) {
      Alert.alert('Tempo inválido', 'Defina um tempo maior que 0 para iniciar.');
      return;
    }
    Keyboard.dismiss();
    setAtivo(true);
  }

  function handlePausar() {
    setAtivo(false);
  }

  function handleResetar() {
    const minutos = parseInt(tempoInicialEmMinutos, 10);
    setSegundosRestantes(!isNaN(minutos) ? minutos * 60 : 0);
    setAtivo(false);
  }

  function formatarTempo(totalSegundos: number) {
    const minutos = Math.floor(totalSegundos / 60);
    const segundos = totalSegundos % 60;
    const mm = minutos < 10 ? '0' + minutos : String(minutos);
    const ss = segundos < 10 ? '0' + segundos : String(segundos);
    return `${mm}:${ss}`;
  }

  const corDisplay = segundosRestantes < 60 ? styles.displayAlerta : styles.displayNormal;

  return (
    <View style={styles.container}>
      <View style={styles.inputRow}>
        <Text style={styles.label}>Minutos:</Text>
        <TextInput
          style={styles.input}
          value={tempoInicialEmMinutos}
          onChangeText={setTempoInicialEmMinutos}
          keyboardType="numeric"
          maxLength={3}
        />
      </View>

      <View style={[styles.displayContainer, corDisplay]}>
        <Text style={styles.displayTexto}>{formatarTempo(segundosRestantes)}</Text>
      </View>

      <View style={styles.botoesRow}>
        <Pressable style={[styles.botao, styles.botaoIniciar]} onPress={handleIniciar}>
          <Text style={styles.botaoTexto}>Iniciar</Text>
        </Pressable>

        <Pressable style={[styles.botao, styles.botaoPausar]} onPress={handlePausar}>
          <Text style={styles.botaoTexto}>Pausar</Text>
        </Pressable>

        <Pressable style={[styles.botao, styles.botaoReset]} onPress={handleResetar}>
          <Text style={styles.botaoTexto}>Resetar</Text>
        </Pressable>
      </View>

      <View style={styles.stats}>
        <Text>Sessões completas: {sessoesCompletas}</Text>
        <Text>Tempo total estudado: {formatarTempo(tempoTotalEstudado)} (MM:SS)</Text>
      </View>
    </View>
  );
};

export default Temporizador;

const styles = StyleSheet.create({
  container: { paddingVertical: 8 },
  inputRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  label: { fontSize: 18, marginRight: 8 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 8, width: 100, borderRadius: 8, textAlign: 'center' },
  displayContainer: { padding: 20, borderRadius: 12, alignItems: 'center', marginBottom: 12 },
  displayNormal: { backgroundColor: '#eef3ff' },
  displayAlerta: { backgroundColor: '#ffdddd' },
  displayTexto: { fontSize: 48, fontWeight: '700' },
  botoesRow: { flexDirection: 'row', justifyContent: 'space-between' },
  botao: { flex:1, marginHorizontal:6, paddingVertical:12, borderRadius:8, alignItems:'center' },
  botaoIniciar: { backgroundColor:'#4caf50' },
  botaoPausar: { backgroundColor:'#ffb300' },
  botaoReset: { backgroundColor:'#e53935' },
  botaoTexto: { color:'#fff', fontWeight:'700' },
  stats: { marginTop:12 }
});
