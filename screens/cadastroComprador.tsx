import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image, ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

//import detalhes graficos
import styles from '../styles/styles'; 
import iconeComprador from '../assets/iconeCadComp.png';

type RootStackParamList = {
  CadastroComprador: undefined;
  CompradorSalvo: { nomeComprador: string; classificacaoComprador: string };
  ListaCompradores: { fromSaveButton: boolean };
};

type CadastroCompradorScreenNavigationProp = StackNavigationProp<RootStackParamList, 'CadastroComprador'>;
type CadastroCompradorScreenRouteProp = RouteProp<RootStackParamList, 'CadastroComprador'>;

type Props = {
  navigation: CadastroCompradorScreenNavigationProp;
  route: CadastroCompradorScreenRouteProp;
};

export default function CadastroComprador({ navigation }: Props) {
  const [nomeComprador, setNomeComprador] = useState('');
  const [telefoneComprador, setTelefoneComprador] = useState('');
  const [classificacaoComprador, setClassificacaoComprador] = useState('PJ');
  const [valorMedioVenda, setValorMedioVenda] = useState('');

  const saveComprador = async () => {
    try {
      const existingCompradores = await AsyncStorage.getItem('compradores');
      const compradores = existingCompradores ? JSON.parse(existingCompradores) : [];
      const newComprador = { nomeComprador, telefoneComprador, classificacaoComprador, valorMedioVenda };
      compradores.push(newComprador);
      await AsyncStorage.setItem('compradores', JSON.stringify(compradores));
      navigation.navigate('CompradorSalvo', { nomeComprador, classificacaoComprador });
    } catch (e) {
      // saving error
      console.error(e);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
    <View style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.headerback} />
      <View style={styles.header}>
        <Image source={iconeComprador} style={styles.icon} />
      </View>

      {/* Corpo */}
      <View style={styles.body}>
        <Text style={styles.label}>Nome do Comprador</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o nome do comprador"
          value={nomeComprador}
          onChangeText={setNomeComprador}
        />

        <Text style={styles.label}>Telefone do Comprador</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o telefone do comprador"
          value={telefoneComprador}
          onChangeText={setTelefoneComprador}
          keyboardType="phone-pad"
        />

        <Text style={styles.label}>Classificação do Comprador</Text>
        <View style={styles.pickerContainer}>
            <Picker
              selectedValue={classificacaoComprador}
              onValueChange={(itemValue) => setClassificacaoComprador(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Pessoa Fisica" value="PF" />
              <Picker.Item label="Pessoa Juridica" value="PJ" />
            </Picker>
        </View>

        <Text style={styles.label}>Valor Médio de Venda por Litro</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o valor médio de venda por litro"
          value={valorMedioVenda}
          onChangeText={setValorMedioVenda}
          keyboardType="numeric"
        />
      </View>

      {/* Rodapé */}
      <View style={styles.footer}>
        <Button title="Salvar" onPress={saveComprador} />
        <Button title="Lista de Compradores" onPress={() => navigation.navigate('ListaCompradores', { fromSaveButton: false })} />
      </View>
    </View>
    </ScrollView>
  );
}