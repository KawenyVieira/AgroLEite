import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import iconeVendas from '../assets/IconeVendas.png';

type RootStackParamList = {
  Vendas: undefined;
  ListaVendas: undefined;
};

type VendasScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Vendas'>;
type VendasScreenRouteProp = RouteProp<RootStackParamList, 'Vendas'>;

type Props = {
  navigation: VendasScreenNavigationProp;
  route: VendasScreenRouteProp;
};

export default function Vendas({ navigation }: Props) {
  const [dataHora, setDataHora] = useState('');
  const [nomeComprador, setNomeComprador] = useState('');
  const [quantidadeLitros, setQuantidadeLitros] = useState('');
  const [valorLitro, setValorLitro] = useState('');
  const [totalVenda, setTotalVenda] = useState('');
  const [observacoes, setObservacoes] = useState('');

  useEffect(() => {
    const total = parseFloat(quantidadeLitros) * parseFloat(valorLitro);
    setTotalVenda(total ? total.toFixed(2) : '');
  }, [quantidadeLitros, valorLitro]);

  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.headerback} />
      <View style={styles.header}>
        <Image source={iconeVendas} style={styles.icon} />
      </View>

      {/* Corpo */}
      <View style={styles.body}>
        <Text style={styles.label}>Data </Text>
        <TextInput
          style={styles.input}
          placeholder="Digite a data"
          value={dataHora}
          onChangeText={setDataHora}
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
        <Button
          title="Salvar"
          onPress={() => navigation.navigate('ListaVendas', {
            dataHora,
            nomeComprador,
            quantidadeLitros,
            valorLitro,
            totalVenda,
            observacoes,
            fromSaveButton: true,
          })}
        />
        <Button
          title="Lista de Vendas"
          onPress={() => navigation.navigate('ListaVendas', {
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
    width: 170,
    height: 170,
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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  column: {
    flex: 1,
    marginRight: 8,
  },
});