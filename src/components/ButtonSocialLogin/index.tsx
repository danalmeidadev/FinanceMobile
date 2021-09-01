import React from 'react';
import {RectButtonProps} from 'react-native-gesture-handler';
import { SvgProps } from 'react-native-svg';
import { useTheme } from 'styled-components';
import { ActivityIndicatorLoading } from '../Loading';
import {Container, ImagemContainer, Text} from './styles';

interface Props extends RectButtonProps {
  title: string;
  svg: React.FC<SvgProps>;
  loading?: boolean;
}

export function ButtonSocialLogin({title, svg: Svg, loading, ...rest}: Props){
  const theme = useTheme();
  return(
    <Container {...rest}>
      <ImagemContainer>
        <Svg />
      </ImagemContainer>
      {loading ? (<ActivityIndicatorLoading color={theme.colors.primary} size='small' />) : (<Text>{title}</Text>)}
    </Container>
  );
}