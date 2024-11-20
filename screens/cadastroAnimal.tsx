import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import iconeCadAnimal from '../assets/iconeCadAnimal.png';

type RootStackParamList = {
  CadastroAnimal: undefined;
  AnimalSalvo: { nomeAnimal: string; classificacaoEtaria: string };
  ListaAnimais: undefined;
};

type CadastroAnimalScreenNavigationProp = StackNavigationProp<RootStackParamList, 'CadastroAnimal'>;
type CadastroAnimalScreenRouteProp = RouteProp<RootStackParamList, 'CadastroAnimal'>;

type Props = {
  navigation: CadastroAnimalScreenNavigationProp;
  route: CadastroAnimalScreenRouteProp;
};

export default function CadastroAnimal({ navigation }: Props) {
  const [nomeAnimal, setNomeAnimal] = useState('');
  const [classificacaoEtaria, setClassificacaoEtaria] = useState('');

  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.headerback} />
      <View style={styles.header}>
        <Image source={iconeCadAnimal} style={styles.icon} />
      </View>

      {/* Corpo */}
      <View style={styles.body}>
        <Text style={styles.label}>Nome do animal</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o nome do animal"
          value={nomeAnimal}
          onChangeText={setNomeAnimal}
        />

        <Text style={styles.label}>Data de nascimento do animal</Text>
        <TextInput style={styles.input} placeholder="Digite a data de nascimento" />

        <Text style={styles.label}>Sexo do Animal</Text>
        <Picker style={styles.input}>
          <Picker.Item label="F" value="F" />
          <Picker.Item label="M" value="M" />
        </Picker>

        <Text style={styles.label}>Classificação Etária</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite a classificação etária"
          value={classificacaoEtaria}
          onChangeText={setClassificacaoEtaria}
        />

        <Text style={styles.label}>Observações</Text>
        <TextInput style={styles.input} placeholder="Digite as observações" />
      </View>

      {/* Rodapé */}
      <View style={styles.footer}>
        <Button
          title="Salvar"
          onPress={() => navigation.navigate('AnimalSalvo', {
            nomeAnimal,
            classificacaoEtaria,
          })}
        />
        <Button title="Lista de Animais" onPress={() => navigation.navigate('ListaAnimais')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    // backgroundColor: '#C2BFBF',
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
    top: 0, 
    left: 0, 
    right: 0, 
    height: 160,
    backgroundColor: '#A2D8E3',
    borderRadius: 16,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  icon: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    alignSelf: 'flex-start',
  },
  body: {
    flex: 1,
    marginTop: 180, // Ajuste conforme necessário para evitar sobreposição com o cabeçalho
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});