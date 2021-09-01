import React, {useState} from 'react';
import { Alert, Platform } from 'react-native';
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
  const {signInWithGoogle, signInWithApple} = useAuth();
  const [loadingGoogle, setLoadingGoole] = useState(false);
  const [loadingApple, setLoadingApple] = useState(false);

  const handleSignInWithGoogle = async() => {
    setLoadingGoole(true);
    try {
      await signInWithGoogle();
    } catch (error) {
      setLoadingGoole(false);
      Alert.alert('Oops!, Não foi possivel conectar a conta Google')    
      console.log(error);
    }
    setLoadingGoole(false);
  }
  
  const handleSignInWithApple = async() => {
    try {
      setLoadingApple(true);
      return await signInWithApple();
    } catch (error) {
      setLoadingApple(false); 
      Alert.alert('Oops!, Não foi possivel conectar a conta Apple')     
      console.log(error);
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
        {Platform.OS === 'ios' ? (
          <>
          <ButtonSocialLogin 
          title='Entrar com Google'
          svg={Images.Google}
          onPress={handleSignInWithGoogle}
          loading={loadingGoogle}
          />

          <ButtonSocialLogin 
            title='Entrar com Apple' 
            svg={Images.Apple} 
            onPress={handleSignInWithApple}
            loading={loadingApple}
          />
          </>   
        ) : (
            <ButtonSocialLogin 
            title='Entrar com Google'
            svg={Images.Google}
            onPress={handleSignInWithGoogle}
            loading={loadingGoogle}
            />
        )}       
        </FootWrapper>
      </Footer>
    </Container>
  );
}