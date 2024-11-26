import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image, ScrollView, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

//import detalhes graficos
import styles from '../styles/styles'; 
import iconeVendas from '../assets/IconeVendas.png';

type RootStackParamList = {
  Vendas: undefined;
  ListaVendas: { fromSaveButton: boolean };
};

type VendasScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Vendas'>;
type VendasScreenRouteProp = RouteProp<RootStackParamList, 'Vendas'>;

type Props = {
  navigation: VendasScreenNavigationProp;
  route: VendasScreenRouteProp;
};

export default function Vendas({ navigation }: Props) {
  const [dataHora, setDataHora] = useState(new Date());
  const [nomeComprador, setNomeComprador] = useState('');
  const [quantidadeLitros, setQuantidadeLitros] = useState('');
  const [valorLitro, setValorLitro] = useState('');
  const [totalVenda, setTotalVenda] = useState('0,00');
  const [observacoes, setObservacoes] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

//Operacao matematica para total de vendas
  useEffect(() => {
    const total = parseFloat(quantidadeLitros) * parseFloat(valorLitro);
    setTotalVenda(total ? total.toFixed(2) : '');
  }, [quantidadeLitros, valorLitro]);

  const saveVenda = async () => {
    try {
      const existingVendas = await AsyncStorage.getItem('vendas');
      const vendas = existingVendas ? JSON.parse(existingVendas) : [];
      const newVenda = { dataHora, nomeComprador, quantidadeLitros, valorLitro, totalVenda, observacoes };
      vendas.push(newVenda);
      await AsyncStorage.setItem('vendas', JSON.stringify(vendas));
      navigation.navigate('ListaVendas', { fromSaveButton: true });
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
        <Image source={iconeVendas} style={styles.icon} />
      </View>

      {/* Corpo */}
      <View style={styles.body}>
        <Text style={styles.label}>Data da venda</Text>
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

        <Text style={styles.label}>Nome do Comprador</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o nome do comprador"
          value={nomeComprador}
          onChangeText={setNomeComprador}
        />

        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.label}>Quantidade em Litros</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite a quantidade em litros"
              value={quantidadeLitros}
              onChangeText={setQuantidadeLitros}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.column}>
            <Text style={styles.label}>Valor do Litro</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite o valor do litro"
              value={valorLitro}
              onChangeText={setValorLitro}
              keyboardType="numeric"
            />
          </View>
        </View>

        <Text style={styles.label}>Total da Venda</Text>
        <TextInput
          style={styles.input}
          placeholder="Total da venda"
          value={totalVenda}
          editable={false}
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
        <Button title="Salvar" onPress={saveVenda} />
        <Button title="Lista de Vendas" onPress={() => navigation.navigate('ListaVendas', { fromSaveButton: false })} />
      </View>
    </View>
    </ScrollView>
  );
}