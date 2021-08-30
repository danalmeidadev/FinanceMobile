import React, {useState, useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Images } from '~/assets/images';
import { Cards } from '~/components/Cards';
import { TransactionsCards, TransactionsCardsProps } from '~/components/TransactionsCards';
import {
  Container, 
  Header, 
  UserInfo,
  LogoutButton,
  UserWrapper,
  Photo,
  User,
  UserWelcone,
  UserName,
  Icone,
  CardsWrappper,
  Transantions,
  Title,
  TransactionsList,
} from './styles';
import { ActivityIndicatorLoading } from '~/components/Loading';
import { dataKey } from '~/utils/dataKey';

export interface DataListProps extends TransactionsCardsProps {
  id: string;
}

interface CardsDataProps {
  amount: string;
  lastTransaction: string;
}

interface CardsData {
  income: CardsDataProps;
  expense: CardsDataProps;
  total: CardsDataProps;
}

export function Dashboard(){
  const [transactions, setTransactions] = useState<DataListProps[]>([]);
  const [cardsTotal, setCardsTotal] = useState<CardsData>({} as CardsData);
  const [loading, setLoading] = useState(true);

  const getLastTransaction = useCallback((collection: DataListProps[], type: 'positive' | 'negative') => {

    const lastTransaction = new Date(Math.max.apply(Math, collection      
      .filter((transaction) =>  transaction.type === type)
      .map((transaction) => (new Date(transaction.date).getTime()))));

      return `${lastTransaction.getDate()} de ${lastTransaction.toLocaleString('pt-BR', {
        month: 'long',
      })}`
  }, []);

  const loadTransactions = useCallback(async() => {
    const response = await AsyncStorage.getItem(dataKey.key);
    const transactions = response ? JSON.parse(response) : [];
    let incomeTotal = 0;
    let expenseTotal = 0;
    const transactionsFormated: DataListProps[] = transactions.map((item: DataListProps) => {

      if(item.type === 'positive'){
        incomeTotal += Number(item.amount);
      } else {
        expenseTotal += Number(item.amount);
      }

      const amount = Number(item.amount).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      });
      const date = Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
      }).format(new Date(item.date));
      return{
        id: item.id,
        name: item.name,
        amount,
        type: item.type,
        category: item.category,
        date,
      }
    });
    setTransactions(transactionsFormated);
    const lastTransactionsIncomeDate = getLastTransaction(transactions, 'positive');
    const lastTransactionExpenseDate = getLastTransaction(transactions, 'negative');
    const intervalDate = `01 a ${lastTransactionsIncomeDate}`

    const total = incomeTotal - expenseTotal;
    setCardsTotal({
      income: {
        amount: incomeTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction: `Última entrada dia ${lastTransactionsIncomeDate}`,
      }, 
      expense: {
        amount: expenseTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction: `Última saída dia ${lastTransactionExpenseDate}`,
        
      },
      total: {
        amount: total.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction: intervalDate,
      }
    });
    setLoading(false);
  }, [])

  useFocusEffect(useCallback(() => {
    loadTransactions();
  }, []))


  return(
    <Container>
      {loading ? <ActivityIndicatorLoading size='large' /> :
        <>
        <Header>
        <UserWrapper>
          <UserInfo>
              <Photo source={Images.Perfil} />
              <User>
                <UserWelcone>Olá,</UserWelcone>
                <UserName>Dan Almeida</UserName>
              </User>
            </UserInfo>
            <LogoutButton onPress={() => {}}>
              <Icone name='power' />
            </LogoutButton>
        </UserWrapper>
        </Header>
        <CardsWrappper>
        <Cards
          title='Entradas'
          amount={cardsTotal.income.amount}
          lastTransaction={cardsTotal.income.lastTransaction}
          type='up'
          />
        <Cards
          title='Saidas'
          amount={cardsTotal.expense.amount}
          lastTransaction={cardsTotal.expense.lastTransaction}
          type='down'
        />
        <Cards
          title='Total'
          amount={cardsTotal.total.amount}
          lastTransaction={cardsTotal.total.lastTransaction}
          type='total'
        />
        </CardsWrappper>
        <Transantions>
          <Title>Listagem</Title>
          <TransactionsList
            data={transactions}
            keyExtractor={item => item.id}
            renderItem={({item}) =>  <TransactionsCards data={item}/>}       
          />        
        </Transantions>
     </>
    }
    </Container>

  );
}