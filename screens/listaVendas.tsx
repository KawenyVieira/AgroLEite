import React from 'react';
import { StyleSheet, Text, View, Image, FlatList } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import iconeVendas from '../assets/IconeVendas.png';

type RootStackParamList = {
  ListaVendas: {
    dataHora?: string;
    nomeComprador?: string;
    quantidadeLitros?: string;
    valorLitro?: string;
    totalVenda?: string;
    observacoes?: string;
    fromSaveButton?: boolean;
  };
};

type ListaVendasScreenRouteProp = RouteProp<RootStackParamList, 'ListaVendas'>;

type Props = {
  route: ListaVendasScreenRouteProp;
};

const data = [
  // Exemplo de dados, você pode substituir pelos dados reais
  { key: '1', dataHora: '2023-01-01', nomeComprador: 'João', quantidadeLitros: '10', totalVenda: '100', observacoes: '' },
  { key: '2', dataHora: '2023-01-02', nomeComprador: 'Maria', quantidadeLitros: '15', totalVenda: '150', observacoes: '' },
  // Adicione mais dados conforme necessário
];

export default function ListaVendas({ route }: Props) {
  const { fromSaveButton } = route.params || {};

  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.headerback} />
      <View style={styles.header}>
        <Image source={iconeVendas} style={styles.icon} />
        {fromSaveButton && <Text style={styles.successMessage}>Salvo com sucesso!</Text>}
      </View>

      {/* Corpo */}
      <View style={styles.body}>
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderText}>Data</Text>
          <Text style={styles.tableHeaderText}>Comprador</Text>
          <Text style={styles.tableHeaderText}>(L)</Text>
          <Text style={styles.tableHeaderText}>Total</Text>
          <Text style={styles.tableHeaderText}></Text>
        </View>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>{item.dataHora}</Text>
              <Text style={styles.tableCell}>{item.nomeComprador}</Text>
              <Text style={styles.tableCell}>{item.quantidadeLitros}</Text>
              <Text style={styles.tableCell}>{item.totalVenda}</Text>
              <Text style={styles.tableCell}>{item.observacoes}</Text>
            </View>
          )}
          keyExtractor={item => item.key}
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
  successMessage: {
    fontSize: 16,
    color: 'green',
    marginTop: 10,
  },
  body: {
    flex: 1,
    marginTop: 200, 
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  tableHeaderText: {
    fontSize: 14,
    fontWeight: 'bold' ,
    flex: 1,
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  tableCell: {
    flex: 1,
    textAlign: 'center',
  },
});