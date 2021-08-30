import React from 'react';
import { ActivityIndicator, ActivityIndicatorProps} from 'react-native';
import {useTheme} from 'styled-components';
import {Container} from './styles';

interface Props extends ActivityIndicatorProps {
  size: 'large' | 'small';
}

export function ActivityIndicatorLoading({size}: Props){
  const theme = useTheme();
  return(
    <Container>
        <ActivityIndicator color={theme.colors.primary} size={size} />
    </Container>
  );
}