import React from 'react';
import {RectButtonProps} from 'react-native-gesture-handler';
import { SvgProps } from 'react-native-svg';
import {Container, ImagemContainer, Text} from './styles';

interface Props extends RectButtonProps {
  title: string;
  svg: React.FC<SvgProps>;
}

export function ButtonSocialLogin({title, svg: Svg, ...rest}: Props){
  return(
    <Container {...rest}>
      <ImagemContainer>
        <Svg />
      </ImagemContainer>
      <Text>{title}</Text>
    </Container>
  );
}