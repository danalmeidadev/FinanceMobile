import styled, {css} from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';

interface typeProps {
  type: 'up' | 'down' | 'total';
}

export const Container = styled.View<typeProps>`
background-color: ${({theme, type}) => type === 'total' ?  theme.colors.secondary : theme.colors.shape};
width: ${RFValue(300)}px;
border-radius: 5px;
padding: 19px 23px ${RFValue(42)}px 23px;
margin-right: 16px;
margin-bottom: 8px;
`;

export const Header = styled.View`
flex-direction: row;
justify-content: space-between;
align-items: center;

`;

export const Title = styled.Text<typeProps>`
font-family: ${({theme}) => theme.fonts.regular};
font-size: ${RFValue(14)}px;
color: ${({theme, type}) => type === 'total' ?  theme.colors.shape : theme.colors.dark};`;

export const Icon = styled(Feather)<typeProps>`
font-size: ${RFValue(40)}px;
${({type}) => type === 'up' && css `
  color: ${({theme}) => theme.colors.success};
`}

${({type}) => type === 'down' && css `
  color: ${({theme}) => theme.colors.error};
`}

${({type}) => type === 'total' && css `
  color: ${({theme}) => theme.colors.shape};
`}
`;

export const Footer = styled.View``;

export const Amount = styled.Text<typeProps>`
font-family: ${({theme}) => theme.fonts.medium};
font-size: ${RFValue(32)}px;
margin-top: 38px;
color: ${({theme, type}) => type === 'total' ?  theme.colors.shape : theme.colors.dark};
`;

export const LastTransaction = styled.Text<typeProps>`
font-family: ${({theme}) => theme.fonts.regular};
font-size: ${RFValue(12)}px;
color: ${({theme, type}) => type === 'total' ?  theme.colors.shape : theme.colors.text};
`;
