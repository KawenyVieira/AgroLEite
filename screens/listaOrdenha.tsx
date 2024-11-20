import React from 'react';
import { StyleSheet, Text, View, Image, FlatList } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import iconeOrdenha from '../assets/iconeOrdenha.png';

type RootStackParamList = {
  ListaOrdenhas: {
    dataHora?: string;
    nomeAnimal?: string;
    quantidadeLitros?: string;
    observacoes?: string;
    fromSaveButton?: boolean;
  };
};

type ListaOrdenhasScreenRouteProp = RouteProp<RootStackParamList, 'ListaOrdenhas'>;

type Props = {
  route: ListaOrdenhasScreenRouteProp;
};

const data = [
  // Exemplo de dados, você pode substituir pelos dados reais
  { key: '1', dataHora: '2023-01-01 10:00', quantidadeLitros: '10', observacoes: '' },
  { key: '2', dataHora: '2023-01-02 11:00', quantidadeLitros: '15', observacoes: '' },
  // Adicione mais dados conforme necessário
];

export default function ListaOrdenha({ route }: Props) {
  const { fromSaveButton } = route.params || {};

  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.headerback} />
      <View style={styles.header}>
        <Image source={iconeOrdenha} style={styles.icon} />
        {fromSaveButton && <Text style={styles.successMessage}>Salvo com sucesso!</Text>}
      </View>

      {/* Corpo */}
      <View style={styles.body}>
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderText}>Data</Text>
          <Text style={styles.tableHeaderText}>Litros</Text>
          <Text style={styles.tableHeaderText}></Text>
        </View>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>{item.dataHora}</Text>
              <Text style={styles.tableCell}>{item.quantidadeLitros}</Text>
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
    marginTop: 200, // Ajuste conforme necessário para evitar sobreposição com o cabeçalho
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  tableHeaderText: {
    fontSize: 16,
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