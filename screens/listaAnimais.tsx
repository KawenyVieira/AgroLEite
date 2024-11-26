import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons'; 

//import detalhes graficos
import stylesListas from '../styles/stylesListas';
import iconeAnimal from '../assets/iconeCadAnimal.png';

type Animal = {
  nomeAnimal: string;
  dataNascimento: string;
  sexo: string;
  classificacaoEtaria: string;
  observacoes: string;
};

type RootStackParamList = {
  ListaAnimais: {
    fromSaveButton?: boolean;
  };
};

type ListaAnimaisScreenRouteProp = RouteProp<RootStackParamList, 'ListaAnimais'>;

type Props = {
  route: ListaAnimaisScreenRouteProp;
};

export default function ListaAnimais({ route }: Props) {
  const { fromSaveButton } = route.params || {};
  const [data, setData] = useState<Animal[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const animals = await AsyncStorage.getItem('animals');
        setData(animals ? JSON.parse(animals) : []);
      } catch (e) {
        // reading error
        console.error(e);
      }
    };
    fetchData();
  }, []);

  const deleteAnimal = async (index: number) => {
    try {
      const animals = await AsyncStorage.getItem('animals');
      let animalsArray = animals ? JSON.parse(animals) : [];
      animalsArray.splice(index, 1);
      await AsyncStorage.setItem('animals', JSON.stringify(animalsArray));
      setData(animalsArray);
    } catch (e) {
      // delete error
      console.error(e);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <View style={stylesListas.container}>
      {/* Cabeçalho */}
      <View style={stylesListas.headerback} />
      <View style={stylesListas.header}>
        <Image source={iconeAnimal} style={stylesListas.icon} />
        {fromSaveButton && <Text style={stylesListas.successMessage}>Salvo com sucesso!</Text>}
      </View>

      {/* Corpo */}
      <View style={stylesListas.body}>
        <View style={stylesListas.tableHeader}>
          <Text style={stylesListas.tableHeaderText}>Nome</Text>
          <Text style={stylesListas.tableHeaderText}>Nascimento</Text>
          <Text style={stylesListas.tableHeaderText}>Sexo</Text>
          <Text style={stylesListas.tableHeaderText}>Class.</Text>
          <Text style={stylesListas.tableHeaderText}></Text>
        </View>
        <FlatList
          data={data}
          renderItem={({ item, index }) => (
            <View style={stylesListas.tableRow}>
              <Text style={stylesListas.tableCell}>{item.nomeAnimal}</Text>
              <Text style={stylesListas.tableCell}>{formatDate(item.dataNascimento)}</Text>
              <Text style={stylesListas.tableCell}>{item.sexo}</Text>
              <Text style={stylesListas.tableCell}>{item.classificacaoEtaria}</Text>
              <View style={stylesListas.tableCell}>
                <TouchableOpacity onPress={() => deleteAnimal(index)}>
                  <Ionicons style={stylesListas.trash} name="trash" size={20}  />
                </TouchableOpacity>
              </View>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  );
}