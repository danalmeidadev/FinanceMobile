import React from 'react';
import { Alert } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Images } from '~/assets/images';
import { ButtonSocialLogin } from '~/components/ButtonSocialLogin';
import { useAuth } from '~/hooks';
import {
  Container,
  Title,
  Header,
  TitleWrapper,
  SignTitle,
  Footer,
  FootWrapper
} from './styles';

export function SignIn(){
  const {signInWithGoogle} = useAuth();

  async function handleSignInWithGoogle(){
    try {
      await signInWithGoogle();

    } catch (error) {
      console.log('error', error);
      Alert.alert('Oops!, Não foi possivel conectar a conta google')
      
    }
  }
  return(
    <Container>
      <Header>
        <TitleWrapper>
          <Images.Finance width={RFValue(120)} height={RFValue(68)} />
            <Title>
            Controle suas {'\n'}
            finanças de forma {'\n'}
            muito simples
            </Title>
        </TitleWrapper>
        <SignTitle>
          Faça seu login com {'\n'}
          uma das contas abaixo
        </SignTitle>
      </Header>
      <Footer>
        <FootWrapper>
          <ButtonSocialLogin 
          title='Entrar com Google'
           svg={Images.Google}
           onPress={handleSignInWithGoogle}
           />
           
          <ButtonSocialLogin 
          title='Entrar com Apple' 
          svg={Images.Apple} 
          />          
        </FootWrapper>
      </Footer>
    </Container>
  );
}