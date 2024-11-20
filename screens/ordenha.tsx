import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import iconeOrdenha from '../assets/iconeOrdenha.png';

type RootStackParamList = {
  Ordenha: undefined;
  ListaOrdenhas: undefined;
};

type OrdenhaScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Ordenha'>;
type OrdenhaScreenRouteProp = RouteProp<RootStackParamList, 'Ordenha'>;

type Props = {
  navigation: OrdenhaScreenNavigationProp;
  route: OrdenhaScreenRouteProp;
};

export default function Ordenha({ navigation }: Props) {
  const [dataHora, setDataHora] = useState('');
  const [nomeAnimal, setNomeAnimal] = useState('');
  const [quantidadeLitros, setQuantidadeLitros] = useState('');
  const [observacoes, setObservacoes] = useState('');

  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.headerback} />
      <View style={styles.header}>
        <Image source={iconeOrdenha} style={styles.icon} />
      </View>

      {/* Corpo */}
      <View style={styles.body}>
        <Text style={styles.label}>Data e Hora da Ordenha</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite a data e hora da ordenha"
          value={dataHora}
          onChangeText={setDataHora}
        />

        <Text style={styles.label}>Nome do Animal</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o nome do animal"
          value={nomeAnimal}
          onChangeText={setNomeAnimal}
        />

        <Text style={styles.label}>Quantidade em Litros</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite a quantidade em litros"
          value={quantidadeLitros}
          onChangeText={setQuantidadeLitros}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Observações</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Digite as observações"
          value={observacoes}
          onChangeText={setObservacoes}
          multiline
        />
      </View>

      {/* Rodapé */}
      <View style={styles.footer}>
      <Button
  title="Salvar"
  onPress={() => navigation.navigate('ListaOrdenhas', {
    dataHora,
    nomeAnimal,
    quantidadeLitros,
    observacoes,
    fromSaveButton: true,
  })}
/>
<Button
  title="Lista de Ordenhas"
  onPress={() => navigation.navigate('ListaOrdenhas', {
    fromSaveButton: false,
  })}
/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  headerback: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 180,
    backgroundColor: '#929090',
    borderRadius: 16,
  },
  header: {
    position: 'absolute',
    top: 20, // Ajuste a posição conforme necessário
    left: 20, // Ajuste a posição conforme necessário
    right: 20, // Ajuste a posição conforme necessário
    height: 160,
    backgroundColor: '#A2D8E3',
    borderRadius: 16,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  icon: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    alignSelf: 'flex-start',
  },
  body: {
    flex: 1,
    marginTop: 200, // Ajuste conforme necessário para evitar sobreposição com o cabeçalho
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  textArea: {
    height: 100,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});