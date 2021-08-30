import styled from "styled-components/native";
import {FlatList} from 'react-native';
import {Feather} from '@expo/vector-icons';
import { RFValue } from "react-native-responsive-fontsize";
import { getBottomSpace } from "react-native-iphone-x-helper";
import {GestureHandlerRootView} from 'react-native-gesture-handler'
import { theme } from "~/theme";

interface CategooryProps {
  isActive: boolean;
}

export const Container = styled(GestureHandlerRootView)`
flex: 1;
background-color: ${({theme}) => theme.colors.background};
`;

export const Header = styled.View`
width: 100%;
height: ${RFValue(113)}px;
background-color: ${({theme}) => theme.colors.primary};
justify-content: flex-end;
align-items: center;
padding-bottom: 19px;
`;

export const ListCategories = styled(FlatList as new () =>  FlatList)`
flex: 1;
width: 100%;
`;

export const Title = styled.Text`
font-family: ${({theme}) => theme.fonts.regular};
font-size: ${RFValue(18)}px;
color: ${({theme}) => theme.colors.shape};
`;

export const Category = styled.TouchableOpacity<CategooryProps>`
width: 100%;
padding: ${RFValue(15)}px;
flex-direction: row;
align-items: center;
background-color: ${({isActive}) =>  isActive ? theme.colors.secondary_light : theme.colors.background};
`;

export const Icon = styled(Feather)`
font-size:  ${RFValue(20)}px;
margin-right: 16px;
`;

export const Name = styled.Text`
font-family: ${({theme}) => theme.fonts.regular};
font-size:  ${RFValue(14)}px;
`;

export const Separator = styled.View`
background-color: ${({theme}) => theme.colors.text};
height: 1px;
width: 100%;
`;

export const Footer = styled.View`
width: 100%;
padding: 24px;
`;
