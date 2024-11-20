
import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

//import icone


export default function Home() {
  return (
    <View style={styles.container}>
      <Text>lista Animal</Text>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 500,
    height: 500,
    resizeMode: 'contain',
  },
});