import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import iconeCadAnimal from '../assets/iconeCadAnimal.png';

type Props = {
  route: {
    params: {
      nomeAnimal: string;
      classificacaoEtaria: string;
    };
  };
};

export default function AnimalSalvo({ route }: Props) {
  const { nomeAnimal, classificacaoEtaria } = route.params;

  return (
    <View style={styles.container}>
       {/* Cabeçalho */}
      <View style={styles.headerback} />
      <View style={styles.header}/>
      <View style={styles.infoContainer}>
        <Text style={styles.text1}>{nomeAnimal}</Text>
        <Image source={iconeCadAnimal} style={styles.icon} />
        <Text style={styles.text2}>{classificacaoEtaria}</Text>
      </View>
      <Text style={styles.message}>Animal salvo com sucesso!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    // backgroundColor: '#C2BFBF',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerback: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 670,
    backgroundColor: '#929090',
    borderRadius: 16,
  },
  header: {
    position: 'absolute',
    top: 0, 
    right: 0,
    left: 0,
    height: 650,
    backgroundColor: '#A2D8E3',
    borderRadius: 16,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  icon: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    marginHorizontal: 16,
  },
  text1: {
    top: 30,
    left: 60,
    fontSize: 20,
    fontWeight: 'bold',
  },
  text2: {
    top: 30,
    right: 60,
    fontSize: 20,
    fontWeight: 'bold',
  },
  message: {
    fontSize: 16,
    color: 'green',
  },
});