import React from 'react';
import { StyleSheet, Text, View, Image, FlatList } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import iconeAnimal from '../assets/iconeCadAnimal.png';

type RootStackParamList = {
  ListaAnimais: {
    nomeAnimal?: string;
    dataNascimento?: string;
    sexo?: string;
    classificacaoEtaria?: string;
    observacoes?: string;
    fromSaveButton?: boolean;
  };
};

type ListaAnimaisScreenRouteProp = RouteProp<RootStackParamList, 'ListaAnimais'>;

type Props = {
  route: ListaAnimaisScreenRouteProp;
};

const data = [
  // Exemplo de dados, você pode substituir pelos dados reais
  { key: '1', nomeAnimal: 'Bessie', dataNascimento: '2020-01-01', sexo: 'F', classificacaoEtaria: 'Adulto', observacoes: '' },
  { key: '2', nomeAnimal: 'Daisy', dataNascimento: '2021-02-02', sexo: 'F', classificacaoEtaria: 'Jovem', observacoes: '' },
  // Adicione mais dados conforme necessário
];

export default function ListaAnimais({ route }: Props) {
  const { fromSaveButton } = route.params || {};

  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.headerback} />
      <View style={styles.header}>
        <Image source={iconeAnimal} style={styles.icon} />
        {fromSaveButton && <Text style={styles.successMessage}>Salvo com sucesso!</Text>}
      </View>

      {/* Corpo */}
      <View style={styles.body}>
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderText}>Nome</Text>
          <Text style={styles.tableHeaderText}>Nascimento</Text>
          <Text style={styles.tableHeaderText}>Sexo</Text>
          <Text style={styles.tableHeaderText}>Classificação</Text>
          <Text style={styles.tableHeaderText}></Text>
        </View>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>{item.nomeAnimal}</Text>
              <Text style={styles.tableCell}>{item.dataNascimento}</Text>
              <Text style={styles.tableCell}>{item.sexo}</Text>
              <Text style={styles.tableCell}>{item.classificacaoEtaria}</Text>
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
    width: 200,
    height: 200,
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