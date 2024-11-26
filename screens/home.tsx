// Home.tsx
import React from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
//import icone
import iconeCadAnimal from '../assets/iconeHome.png';


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
      {/* Cabeçalho */}
      <View style={styles.headerback} />
      <View style={styles.header}>
        <Image source={iconeCadAnimal} style={styles.icon} />
        <Text style={styles.textHeader}>AGROLEITE</Text>
      </View>
        
        {/* Corpo */}
      <View style={styles.body}>
      <View style={styles.section1}>
        <Text style={styles.title}>CADASTROS</Text>
        <View style={styles.buttonContainer}>
          <Button title="Cadastrar Animal" 
            onPress={() => navigation.navigate('CadastroAnimal')}
            color='#8DD7E7' 
          />
        </View>
        
        <View style={styles.buttonContainer}>
          <Button title="Cadastrar Comprador" 
            onPress={() => navigation.navigate('CadastroComprador')} 
            color='#8DD7E7'
          />
        </View>
       
      </View>

      <View style={styles.section2}>
        <Text style={styles.title}>VENDAS</Text>
        
        <View style={styles.buttonContainer}>
          <Button title="Ordenha" 
            onPress={() => navigation.navigate('Ordenha')} 
            color='#9BE2C5'
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Vendas" 
            onPress={() => navigation.navigate('Vendas')} 
            color='#9BE2C5'
          />
        </View>

      </View>
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
  body: {
    flex: 1,
    marginTop: 250,
  },
  section1: {
    marginBottom: 24,
    padding: 16,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    backgroundColor: '#8DD7E7',
    height: 200,
  },
  section2: {
    marginBottom: 24,
    padding: 16,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    backgroundColor: '#9BE2C5',
    height: 200,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: 'white',
  },
  headerback: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 230,
    backgroundColor: '#929090',
    borderRadius: 16,
  },
  header: {
    position: 'absolute',
    top: 0, 
    left: 0,
    right: 0,
    height: 210,
    backgroundColor: '#3CB69A',
    borderRadius: 16,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  icon: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  textHeader: {
    position: 'absolute',
    top: 160,
    left: 140,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    alignSelf: 'center',
  },
  buttonContainer: {
    top: 10,
    marginBottom: 10, 
  },
});