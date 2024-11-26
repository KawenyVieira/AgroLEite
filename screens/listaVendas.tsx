import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons'; // Certifique-se de ter o pacote @expo/vector-icons instalado
import stylesListas from '../styles/stylesListas';

import iconeVendas from '../assets/IconeVendas.png';

type Venda = {
  dataHora: string;
  nomeComprador: string;
  quantidadeLitros: string;
  valorLitro: string;
  totalVenda: string;
  observacoes: string;
};

type RootStackParamList = {
  ListaVendas: {
    fromSaveButton?: boolean;
  };
};

type ListaVendasScreenRouteProp = RouteProp<RootStackParamList, 'ListaVendas'>;

type Props = {
  route: ListaVendasScreenRouteProp;
};

export default function ListaVendas({ route }: Props) {
  const { fromSaveButton } = route.params || {};
  const [data, setData] = useState<Venda[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const vendas = await AsyncStorage.getItem('vendas');
        setData(vendas ? JSON.parse(vendas) : []);
      } catch (e) {
        // reading error
        console.error(e);
      }
    };
    fetchData();
  }, []);

  const deleteVenda = async (index: number) => {
    try {
      const vendas = await AsyncStorage.getItem('vendas');
      let vendasArray = vendas ? JSON.parse(vendas) : [];
      vendasArray.splice(index, 1);
      await AsyncStorage.setItem('vendas', JSON.stringify(vendasArray));
      setData(vendasArray);
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
        <Image source={iconeVendas} style={stylesListas.icon} />
        {fromSaveButton && <Text style={stylesListas.successMessage}>Salvo com sucesso!</Text>}
      </View>

      {/* Corpo */}
      <View style={stylesListas.body}>
        <View style={stylesListas.tableHeader}>
          <Text style={stylesListas.tableHeaderText}>Data</Text>
          <Text style={stylesListas.tableHeaderText}>Comprador</Text>
          <Text style={stylesListas.tableHeaderText}>Litros</Text>
          <Text style={stylesListas.tableHeaderText}>Total</Text>
          <Text style={stylesListas.tableHeaderText}></Text>
        </View>
        <FlatList
          data={data}
          renderItem={({ item, index }) => (
            <View style={stylesListas.tableRow}>
              <Text style={stylesListas.tableCell}>{formatDate(item.dataHora)}</Text>
              <Text style={stylesListas.tableCell}>{item.nomeComprador}</Text>
              <Text style={stylesListas.tableCell}>{item.quantidadeLitros}</Text>
              <Text style={stylesListas.tableCell}>{item.totalVenda}</Text>
              <View style={stylesListas.tableCell}>
                <TouchableOpacity onPress={() => deleteVenda(index)}>
                  <Ionicons style={stylesListas.trash} name="trash" size={20} />
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