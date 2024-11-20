import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

import iconeComprador from '../assets/iconeCadComp.png';

type RootStackParamList = {
  CadastroComprador: undefined;
  CompradorSalvo: { nomeComprador: string; classificacaoComprador: string };
  ListaCompradores: undefined;
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
  const [classificacaoComprador, setClassificacaoComprador] = useState('');
  const [valorMedioVenda, setValorMedioVenda] = useState('');

  return (
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
        <Picker
          selectedValue={classificacaoComprador}
          style={styles.input}
          onValueChange={(itemValue) => setClassificacaoComprador(itemValue)}
        >
          <Picker.Item label="PF" value="PF" />
          <Picker.Item label="PJ" value="PJ" />
        </Picker>

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
        <Button
        title="Salvar"
        onPress={() => navigation.navigate('ListaCompradores', {
          nomeComprador,
          telefoneComprador,
          classificacaoComprador,
          valorMedioVenda,
          fromSaveButton: true,
        })}
      />
      <Button
        title="Lista de Compradores"
        onPress={() => navigation.navigate('ListaCompradores', {
          fromSaveButton: false,
        })} />
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
    top: 0, // Ajuste a posição conforme necessário
    left: 0, // Ajuste a posição conforme necessário
    right: 0, // Ajuste a posição conforme necessário
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
    marginTop: 190, // Ajuste conforme necessário para evitar sobreposição com o cabeçalho
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