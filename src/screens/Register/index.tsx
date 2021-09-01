import React, {useState} from 'react';
import {Modal, TouchableWithoutFeedback, Keyboard, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import uuid  from 'react-native-uuid';
import {useForm} from 'react-hook-form';
import * as Yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage'
import {yupResolver} from '@hookform/resolvers/yup';
import { InputController } from '~/components/InputController';
import { Button } from '~/components/Button';
import { TransactionButton } from '~/components/TransactionButton';
import { SelectCategory } from '~/components/SelectCategory';
import { CategorySelect } from '../CategorySelect';
import {Container, Header, Title, Fields, Form, WrappperTransactions} from './styles';
import { dataKey } from '~/utils/dataKey';
import { useAuth } from '~/hooks';

interface FormData {
  name: string;
  amount: string;
}

type NavigationProps = {
  navigate:(screen:string) => void;
}

const schema = Yup.object().shape({
  name: Yup.string().required('Campo obrigatório'),
  amount: Yup.number()
  .required('Campo obrigatório')
  .typeError('Informe uma valor')
  .positive('O valor não pode ser negativo'),

})

export function Register(){
  const {user} = useAuth();
  const {navigate} = useNavigation<NavigationProps>();
  const [transactionType, setTransactionType] = useState('');
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria',
  });
  const {control, handleSubmit, reset, formState: {errors}} = useForm({
    resolver: yupResolver(schema)
  });

  const handleTransactionTypeSelect = (type: 'positive' | 'negative') => {
    setTransactionType(type)
  }

  const handleCloseSelectCategory = () => {
    setCategoryModalOpen((state) => !state);
  }

  const handleRegister = async(form: FormData) => {
    if(!transactionType)
      return Alert.alert('Selecione o tipo da transação.');

      if(category.key === 'category')
        return Alert.alert('Selecione a categoria.');

    const newTransaction = {
      id: String(uuid.v4()),
      name: form.name,
      amount: form.amount,
      type: transactionType,
      category: category.key,
      date: new Date(),
    }

    try {
      const data = await AsyncStorage.getItem(`${dataKey.key}${user.id}`);
      const currentData = data ? JSON.parse(data) : [];
      const dataFormated = [...currentData, newTransaction]
      await AsyncStorage.setItem(`${dataKey.key}${user.id}`, JSON.stringify(dataFormated));
      reset();
      setTransactionType('');
      setCategory(
        {
          key: 'category',
          name: 'Categoria',
        }
      )      
      navigate('Listagem');
      
    } catch (error) {
      console.log('errorListagem', error)
      Alert.alert('Oops!, Error ao cadastrar!')
    }

  }
  return(
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
        <Title>Cadastro</Title>
        </Header>
        <Form>
          <Fields>
            <InputController
            name='name'
            control={control}
            autoCapitalize='sentences'
            autoCorrect={false}
            error={errors.name && errors.name.message}
            placeholder='Nome'
            />
            <InputController
            name='amount'
            control={control}
            keyboardType='numeric'
            error={errors.amount && errors.amount.message}
            placeholder='Preço'
            />
          <WrappperTransactions>
            <TransactionButton 
              type='up'
              title='Entrada'
              onPress={() => handleTransactionTypeSelect('positive')}
              isActive={transactionType === 'positive'}
              />
              <TransactionButton 
              type='down'
              title='Saida' 
              onPress={() => handleTransactionTypeSelect('negative')}
              isActive={transactionType === 'negative'}
              />
          </WrappperTransactions>
          <SelectCategory 
          title={category.name}
          onPress={handleCloseSelectCategory}
          />
          </Fields>
          <Button title='Enviar' onPress={handleSubmit(handleRegister)} />
        </Form>
        <Modal visible={categoryModalOpen}>
          <CategorySelect
            category={category}
            setCategory={setCategory}
            closeSelectCategory={handleCloseSelectCategory}
          />
        </Modal>
      </Container>
    </TouchableWithoutFeedback>

  );
}