import React from 'react';
import { StyleSheet, Text, View, Image, FlatList } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import iconeComprador from '../assets/iconeCadComp.png';

type RootStackParamList = {
  ListaCompradores: {
    nomeComprador?: string;
    telefoneComprador?: string;
    classificacaoComprador?: string;
    valorMedioVenda?: string;
    fromSaveButton?: boolean;
  };
};

type ListaCompradoresScreenRouteProp = RouteProp<RootStackParamList, 'ListaCompradores'>;

type Props = {
  route: ListaCompradoresScreenRouteProp;
};

const data = [
  // Exemplo de dados, você pode substituir pelos dados reais
  { key: '1', nomeComprador: 'João', telefoneComprador: '123456789', classificacaoComprador: 'PF', valorMedioVenda: '3.50' },
  { key: '2', nomeComprador: 'Maria', telefoneComprador: '987654321', classificacaoComprador: 'PJ', valorMedioVenda: '4.00' },
  // Adicione mais dados conforme necessário
];

export default function ListaComprador({ route }: Props) {
  const { fromSaveButton } = route.params || {};

  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.headerback} />
      <View style={styles.header}>
        <Image source={iconeComprador} style={styles.icon} />
        {fromSaveButton && <Text style={styles.successMessage}>Salvo com sucesso!</Text>}
      </View>

      {/* Corpo */}
      <View style={styles.body}>
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderText}>Nome</Text>
          <Text style={styles.tableHeaderText}>Telefone</Text>
          <Text style={styles.tableHeaderText}>Classificação</Text>
          <Text style={styles.tableHeaderText}>Preço Médio</Text>
        </View>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>{item.nomeComprador}</Text>
              <Text style={styles.tableCell}>{item.telefoneComprador}</Text>
              <Text style={styles.tableCell}>{item.classificacaoComprador}</Text>
              <Text style={styles.tableCell}>{item.valorMedioVenda}</Text>
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
    fontWeight: 'bold',
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