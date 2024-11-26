import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image, ScrollView, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker'; 



//import detalhes graficos
import iconeCadAnimal from '../assets/iconeCadAnimal.png';
import styles from '../styles/styles'; 

type RootStackParamList = {
  CadastroAnimal: undefined;
  AnimalSalvo: { nomeAnimal: string; classificacaoEtaria: string };
  ListaAnimais: { fromSaveButton: boolean };
};

type CadastroAnimalScreenNavigationProp = StackNavigationProp<RootStackParamList, 'CadastroAnimal'>;
type CadastroAnimalScreenRouteProp = RouteProp<RootStackParamList, 'CadastroAnimal'>;

type Props = {
  navigation: CadastroAnimalScreenNavigationProp;
  route: CadastroAnimalScreenRouteProp;
};

export default function CadastroAnimal({ navigation }: Props) {
  const [nomeAnimal, setNomeAnimal] = useState('');
  const [dataNascimento, setDataNascimento] = useState(new Date());
  const [sexo, setSexo] = useState('F');
  const [classificacaoEtaria, setClassificacaoEtaria] = useState('Vaca');
  const [observacoes, setObservacoes] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const saveAnimal = async () => {
    try {
      const existingAnimals = await AsyncStorage.getItem('animals');
      const animals = existingAnimals ? JSON.parse(existingAnimals) : [];
      const newAnimal = { nomeAnimal, dataNascimento, sexo, classificacaoEtaria, observacoes };
      animals.push(newAnimal);
      await AsyncStorage.setItem('animals', JSON.stringify(animals));
      navigation.navigate('AnimalSalvo', { nomeAnimal, classificacaoEtaria });
    } catch (e) {
      // saving error
      console.error(e);
    }
  };
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    setDataNascimento(date);
    hideDatePicker();
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
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
          <TouchableOpacity onPress={showDatePicker}>
            <View style={styles.dateInput}>
              <Text>{dataNascimento.toISOString().split('T')[0]}</Text>
            </View>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />


        <Text style={styles.label}>Sexo do Animal</Text>
        <View style={styles.pickerContainer}>
            <Picker
              selectedValue={sexo}
              onValueChange={(itemValue) => setSexo(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Feminino" value="F" />
              <Picker.Item label="Masculino" value="M" />
            </Picker>
        </View>

        <Text style={styles.label}>Classificação Etária</Text>
        <View style={styles.pickerContainer}>
            <Picker
              selectedValue={classificacaoEtaria}
              onValueChange={(itemValue) => setClassificacaoEtaria(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Bezerro" value="Bezerro" />
              <Picker.Item label="Novilha" value="Novilha" />
              <Picker.Item label="Garrote" value="Garrote" />
              <Picker.Item label="Vaca" value="Vaca" />
              <Picker.Item label="Boi" value="Boi" />
            </Picker>
        </View>

        <Text style={styles.label}>Observações</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite as observações"
          value={observacoes}
          onChangeText={setObservacoes}
        />
      </View>

      {/* Rodapé */}
      <View style={styles.footer}>
        <Button title="Salvar" onPress={saveAnimal} />
        <Button title="Lista de Animais" 
        onPress={() => navigation.navigate('ListaAnimais', 
        { fromSaveButton: false })} />
      </View>
    </View>
    </ScrollView>
  );
}

