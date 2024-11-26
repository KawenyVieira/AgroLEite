import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons'; // Certifique-se de ter o pacote @expo/vector-icons instalado
import stylesListas from '../styles/stylesListas';

import iconeComprador from '../assets/iconeCadComp.png';

type Comprador = {
  nomeComprador: string;
  telefoneComprador: string;
  classificacaoComprador: string;
  valorMedioVenda: string;
};

type RootStackParamList = {
  ListaCompradores: {
    fromSaveButton?: boolean;
  };
};

type ListaCompradoresScreenRouteProp = RouteProp<RootStackParamList, 'ListaCompradores'>;

type Props = {
  route: ListaCompradoresScreenRouteProp;
};

export default function ListaComprador({ route }: Props) {
  const { fromSaveButton } = route.params || {};
  const [data, setData] = useState<Comprador[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const compradores = await AsyncStorage.getItem('compradores');
        setData(compradores ? JSON.parse(compradores) : []);
      } catch (e) {
        // reading error
        console.error(e);
      }
    };
    fetchData();
  }, []);

  const deleteComprador = async (index: number) => {
    try {
      const compradores = await AsyncStorage.getItem('compradores');
      let compradoresArray = compradores ? JSON.parse(compradores) : [];
      compradoresArray.splice(index, 1);
      await AsyncStorage.setItem('compradores', JSON.stringify(compradoresArray));
      setData(compradoresArray);
    } catch (e) {
      // delete error
      console.error(e);
    }
  };

  return (
    <View style={stylesListas.container}>
      {/* Cabeçalho */}
      <View style={stylesListas.headerback} />
      <View style={stylesListas.header}>
        <Image source={iconeComprador} style={stylesListas.icon} />
        {fromSaveButton && <Text style={stylesListas.successMessage}>Salvo com sucesso!</Text>}
      </View>

      {/* Corpo */}
      <View style={stylesListas.body}>
        <View style={stylesListas.tableHeader}>
          <Text style={stylesListas.tableHeaderText}>Nome</Text>
          <Text style={stylesListas.tableHeaderText}>Tel.</Text>
          <Text style={stylesListas.tableHeaderText}>Classe</Text>
          <Text style={stylesListas.tableHeaderText}>Preço Médio</Text>
          <Text style={stylesListas.tableHeaderText}></Text>
        </View>
        <FlatList
          data={data}
          renderItem={({ item, index }) => (
            <View style={stylesListas.tableRow}>
              <Text style={stylesListas.tableCell}>{item.nomeComprador}</Text>
              <Text style={stylesListas.tableCell}>{item.telefoneComprador}</Text>
              <Text style={stylesListas.tableCell}>{item.classificacaoComprador}</Text>
              <Text style={stylesListas.tableCell}>{item.valorMedioVenda}</Text>
              <View style={stylesListas.tableCell}>
                <TouchableOpacity onPress={() => deleteComprador(index)}>
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