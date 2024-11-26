import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons'; // Certifique-se de ter o pacote @expo/vector-icons instalado
import stylesListas from '../styles/stylesListas';

import iconeOrdenha from '../assets/iconeOrdenha.png';

type Ordenha = {
  dataHora: string;
  nomeAnimal: string;
  quantidadeLitros: string;
  observacoes: string;
};

type RootStackParamList = {
  ListaOrdenhas: {
    fromSaveButton?: boolean;
  };
};

type ListaOrdenhasScreenRouteProp = RouteProp<RootStackParamList, 'ListaOrdenhas'>;

type Props = {
  route: ListaOrdenhasScreenRouteProp;
};

export default function ListaOrdenha({ route }: Props) {
  const { fromSaveButton } = route.params || {};
  const [data, setData] = useState<Ordenha[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ordenhas = await AsyncStorage.getItem('ordenhas');
        setData(ordenhas ? JSON.parse(ordenhas) : []);
      } catch (e) {
        // reading error
        console.error(e);
      }
    };
    fetchData();
  }, []);

  const deleteOrdenha = async (index: number) => {
    try {
      const ordenhas = await AsyncStorage.getItem('ordenhas');
      let ordenhasArray = ordenhas ? JSON.parse(ordenhas) : [];
      ordenhasArray.splice(index, 1);
      await AsyncStorage.setItem('ordenhas', JSON.stringify(ordenhasArray));
      setData(ordenhasArray);
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
        <Image source={iconeOrdenha} style={stylesListas.icon} />
        {fromSaveButton && <Text style={stylesListas.successMessage}>Salvo com sucesso!</Text>}
      </View>

      {/* Corpo */}
      <View style={stylesListas.body}>
        <View style={stylesListas.tableHeader}>
          <Text style={stylesListas.tableHeaderText}>Data</Text>
          <Text style={stylesListas.tableHeaderText}>Nome do Animal</Text>
          <Text style={stylesListas.tableHeaderText}>Litros</Text>
          <Text style={stylesListas.tableHeaderText}></Text>
        </View>
        <FlatList
          data={data}
          renderItem={({ item, index }) => (
            <View style={stylesListas.tableRow}>
              <Text style={stylesListas.tableCell}>{formatDate(item.dataHora)}</Text>
              <Text style={stylesListas.tableCell}>{item.nomeAnimal}</Text>
              <Text style={stylesListas.tableCell}>{item.quantidadeLitros}</Text>
              <View style={stylesListas.tableCell}>
                <TouchableOpacity onPress={() => deleteOrdenha(index)}>
                  <Ionicons style={stylesListas.trash} name="trash" size={20}/>
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