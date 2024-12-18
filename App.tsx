import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

//import de icone
import iconeHome from './assets/iconeHome.png';

//import de paginas
import home from './screens/home';
import CadastroAnimal from './screens/cadastroAnimal';
import AnimalSalvo from './screens/animalSalvo';
import ListaAnimais from './screens/listaAnimais';
import CadastroComprador from './screens/cadastroComprador';
import CompradorSalvo from './screens/compradorSalvo';
import ListaCompradores from './screens/listaComprador';
import Ordenha from './screens/ordenha';
import ListaOrdenhas from './screens/listaOrdenha';
import Vendas from './screens/vendas';
import ListaVendas from './screens/listaVendas';

type RootStackParamList = {
  Main: undefined;
  Home: undefined;
  CadastroAnimal: undefined;
  AnimalSalvo: { nomeAnimal: string; classificacaoEtaria: string };
  ListaAnimais: { fromSaveButton: boolean };
  CadastroComprador: undefined;
  CompradorSalvo: { nomeComprador: string; classificacaoComprador: string };
  ListaCompradores: { fromSaveButton: boolean };
  Ordenha: undefined;
  ListaOrdenhas: undefined;
  Vendas: undefined;
  ListaVendas: undefined;
};

type MainScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;
type MainScreenRouteProp = RouteProp<RootStackParamList, 'Main'>;

type Props = {
  navigation: MainScreenNavigationProp;
  route: MainScreenRouteProp;
};

const Stack = createStackNavigator<RootStackParamList>();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="Home" component={home} />
        <Stack.Screen name="CadastroAnimal" component={CadastroAnimal} />
        <Stack.Screen name="AnimalSalvo" component={AnimalSalvo} />
        <Stack.Screen name="ListaAnimais" component={ListaAnimais} />
        <Stack.Screen name="CadastroComprador" component={CadastroComprador} />
        <Stack.Screen name="CompradorSalvo" component={CompradorSalvo} />
        <Stack.Screen name="ListaCompradores" component={ListaCompradores} />
        <Stack.Screen name="Ordenha" component={Ordenha} />
        <Stack.Screen name="ListaOrdenhas" component={ListaOrdenhas} />
        <Stack.Screen name="Vendas" component={Vendas} />
        <Stack.Screen name="ListaVendas" component={ListaVendas} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function MainScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.texto}>Bem Vindo ao AgroLeite</Text>
      <Text style={styles.texto}>Aplicativo de gestao de Vendas</Text>
      <Image source={iconeHome} style={styles.image} />
      <Button title="INICIAR" onPress={() => navigation.navigate('Home')} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#3CB69A',
  },
  image: {
    width: 500,
    height: 500,
    resizeMode: 'contain',
    marginBottom: 16,
  },
  texto:{
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#fff',
  }
});

export default App;