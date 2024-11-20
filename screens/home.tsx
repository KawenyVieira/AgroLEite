// Home.tsx
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

type RootStackParamList = {
  CadastroAnimal: undefined;
  CadastroComprador: undefined;
  Ordenha: undefined;
  Vendas: undefined;
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'CadastroAnimal'>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

export default function Home({ navigation }: Props) {
  return (
    <View style={styles.container}>

      <View style={styles.section1}>
        <Text style={styles.title}>Cadastro</Text>
        <Button title="Cadastrar Animal" onPress={() => navigation.navigate('CadastroAnimal')} />
        <Button title="Cadastrar Comprador" onPress={() => navigation.navigate('CadastroComprador')} />
      </View>

      <View style={styles.section2}>
        <Text style={styles.title}>Vendas</Text>
        <Button title="Ordenha" onPress={() => navigation.navigate('Ordenha')} />
        <Button title="Vendas" onPress={() => navigation.navigate('Vendas')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    // backgroundColor: '#C2BFBF',
  },
  section1: {
    marginBottom: 24,
    padding: 16,
    borderRadius: 30,
    backgroundColor: '#8DD7E7',
  },
  section2: {
    marginBottom: 24,
    padding: 16,
    borderRadius: 30,
    backgroundColor: '#9BE2C5',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});