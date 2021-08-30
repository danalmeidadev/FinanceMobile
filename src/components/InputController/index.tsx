import React from 'react';
import {Control, Controller} from 'react-hook-form';
import { TextInputProps } from 'react-native';
import {Container, Error} from './styles';
import {InputText} from '../Input'

interface Props extends TextInputProps {
  name: string;
  control: Control;
  error: string;
}

export function InputController({name, control, error,  ...rest}: Props){
  return(
    <Container>
      <Controller
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <InputText
          onChangeText={onChange}
          value={value}  
          {...rest} />
        )}
        name={name}
      />
     {error &&  <Error>{error}</Error>}
    </Container>
  );
}