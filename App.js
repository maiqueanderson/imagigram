import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Landing from './components/auth/landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';

//serve para configurar o menu do react navigation
const Stack = createNativeStackNavigator();

//aqui serve para configurar a barra do navigation
const navOption = {
  //aqui é para esconder a barra de navegação padrão
  headerShown: false
}

export default function App() {
  return (
    //toda essa configuração abaixo em navigation e stack é para a navegação dentro do app, veio do react navigation
    <NavigationContainer>
      <Stack.Navigator>
      {/* aqui esta sendo configurado a navegação dos componentes, parecido com o React RouterDom */}
        <Stack.Screen name="Landing" component={Landing} options={navOption} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
      </Stack.Navigator>
    
    </NavigationContainer>
  );
}

