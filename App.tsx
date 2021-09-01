import 'react-native-gesture-handler';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';
import React from 'react';
import { ThemeProvider } from 'styled-components/native';
import {NavigationContainer} from '@react-navigation/native';
import {useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_700Bold} from '@expo-google-fonts/poppins';
import AppLoading from 'expo-app-loading';
import { theme } from '~/theme';
import { StatusBar } from 'react-native';
import { AuthProvider, useAuth } from '~/hooks';
import { Routes } from '~/routes';

export default function App() {
  const {userLoadingUserStorage} = useAuth();
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold
  });


  if(!fontsLoaded || userLoadingUserStorage){
    return <AppLoading />
  }

  return (
    <ThemeProvider theme={theme}>
        <StatusBar barStyle='light-content' />
        <AuthProvider>
           <Routes />
        </AuthProvider>
    </ThemeProvider>
  );
}