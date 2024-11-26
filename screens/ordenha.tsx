import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image, ScrollView, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker'; 

//import detalhes graficos
import styles from '../styles/styles'; 
import iconeOrdenha from '../assets/iconeOrdenha.png';

type RootStackParamList = {
  Ordenha: undefined;
  ListaOrdenhas: { fromSaveButton: boolean };
};

type OrdenhaScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Ordenha'>;
type OrdenhaScreenRouteProp = RouteProp<RootStackParamList, 'Ordenha'>;

type Props = {
  navigation: OrdenhaScreenNavigationProp;
  route: OrdenhaScreenRouteProp;
};

export default function Ordenha({ navigation }: Props) {
  const [dataHora, setDataHora] = useState(new Date());;
  const [nomeAnimal, setNomeAnimal] = useState('');
  const [quantidadeLitros, setQuantidadeLitros] = useState('');
  const [observacoes, setObservacoes] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const saveOrdenha = async () => {
    try {
      const existingOrdenhas = await AsyncStorage.getItem('ordenhas');
      const ordenhas = existingOrdenhas ? JSON.parse(existingOrdenhas) : [];
      const newOrdenha = { dataHora, nomeAnimal, quantidadeLitros, observacoes };
      ordenhas.push(newOrdenha);
      await AsyncStorage.setItem('ordenhas', JSON.stringify(ordenhas));
      navigation.navigate('ListaOrdenhas', { fromSaveButton: true });
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
    setDataHora(date);
    hideDatePicker();
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
    <View style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.headerback} />
      <View style={styles.header}>
        <Image source={iconeOrdenha} style={styles.icon} />
      </View>

      {/* Corpo */}
      <View style={styles.body}>
        <Text style={styles.label}>Data da Ordenha</Text>
        <TouchableOpacity onPress={showDatePicker}>
            <View style={styles.dateInput}>
              <Text>{dataHora.toISOString().split('T')[0]}</Text>
            </View>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
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
        <Button title="Salvar" onPress={saveOrdenha} />
        <Button title="Lista de Ordenhas" onPress={() => navigation.navigate('ListaOrdenhas', { fromSaveButton: false })} />
      </View>
    </View>
    </ScrollView> 
  );
}