import 'react-native-gesture-handler';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';
import React from 'react';
import { ThemeProvider } from 'styled-components/native';
import {NavigationContainer} from '@react-navigation/native';
import {useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_700Bold} from '@expo-google-fonts/poppins';
import AppLoading from 'expo-app-loading';
import { theme } from '~/theme';
import { Dashboard } from '~/screens/Dashboard';
import { Register } from '~/screens/Register';
import { CategorySelect } from '~/screens/CategorySelect';
import { AppRoutes } from '~/routes/app.routes';
import { StatusBar } from 'react-native';
import { AuthProvider } from '~/hooks';

export default function App() {

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold
  });

  if(!fontsLoaded){
    return <AppLoading />
  }

  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <StatusBar barStyle='light-content' />
        <AuthProvider>
           <AppRoutes />
        </AuthProvider>
      </NavigationContainer>
    </ThemeProvider>
  );
}