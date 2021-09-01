import React, {useCallback, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import {addMonths, subMonths, format} from 'date-fns';
import {ptBR} from 'date-fns/locale';
import {useTheme} from 'styled-components';
import {VictoryPie} from 'victory-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HistoryCard } from '~/components/HistoryCard';
import { dataKey } from '~/utils/dataKey';
import { categories } from '~/utils/categories';
import { ActivityIndicatorLoading } from '~/components/Loading';
import {
  Container,
  Header,
  Title,
  WrapperContent,
  ChartContainer,
  MonthSelect,
  MonthSelectButton,
  MonthSelectIcon,
  Month,
      } from './styles';
import { useAuth } from '~/hooks';

interface TransactionsData {
  type: 'positive' | 'negative';
  name: string;
  amount: string;
  category: string;
  date: string;
}

interface CategoryDate {
  key: string;
  name: string;
  total: number;
  totalFormatted: string;
  color: string;
  percent: string;
}

export function Resume(){
  const {user} = useAuth();
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [totalByCategories, setTotalByCategoies] = useState<CategoryDate[]>([]);

  const handleDateChange = (action: 'next' | 'prev') => {
    if(action === 'next'){
      setSelectedDate(addMonths(selectedDate, 1));
    } else {
      setSelectedDate(subMonths(selectedDate, 1));
    }
  }

  const loadData = useCallback(async() => {
    setLoading(true);
    const response = await AsyncStorage.getItem(`${dataKey.key}${user.id}`);
    const responseFormatted = response ? JSON.parse(response) : [];

    const expensives = responseFormatted
    .filter((expensive: TransactionsData) => expensive.type ===  'negative' && 
    new Date(expensive.date).getMonth() === selectedDate.getMonth() &&
    new Date(expensive.date).getFullYear() === selectedDate.getFullYear());

    const expensivesTotal = expensives?.reduce((acumullator: number, expensive: TransactionsData) => {
      return acumullator + Number(expensive.amount);
    }, 0)

    const totalByCategory: CategoryDate[] = [];
    categories.forEach((category) => {
      let categorySum = 0;
      expensives.forEach((expensive: TransactionsData) => {
        if(expensive.category === category.key){
          categorySum += Number(expensive.amount);
        }
          
      });

      if(categorySum > 0){
        const totalFormatted = categorySum.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        })
        
        const percent = `${(categorySum / expensivesTotal * 100).toFixed(0)}%`;
        
        totalByCategory.push({
          key: category.key,
          name: category.name,
          color: category.color,
          total: categorySum,
          totalFormatted,
          percent
        })
      }
    })

    setTotalByCategoies(totalByCategory);
    setLoading(false);

  }, [selectedDate]);

  useFocusEffect(useCallback(() => {
    loadData();
  }, [selectedDate]))



  return(
    <Container>
        <Header>
          <Title>Resumo por categoria</Title>
        </Header>
        {loading ? <ActivityIndicatorLoading size='large' /> :
          <WrapperContent
          showsVerticalScrollIndicator={false} 
          contentContainerStyle={{
            paddingHorizontal: 24,
            paddingBottom: useBottomTabBarHeight(),
          }}>
            <MonthSelect>
              <MonthSelectButton onPress={() => handleDateChange('prev')}>
                <MonthSelectIcon name='chevron-left' />
              </MonthSelectButton>
              <Month>{format(selectedDate, 'MMMM, yyyy', {locale: ptBR})}</Month>

              <MonthSelectButton onPress={() => handleDateChange('next')}>
                <MonthSelectIcon name='chevron-right' />
              </MonthSelectButton>
            </MonthSelect>
            <ChartContainer>
                  <VictoryPie
                    data={totalByCategories}
                    colorScale={totalByCategories.map((category) => category.color)}
                    style={{
                      labels: {
                        fontSize: RFValue(12),
                        fontWeight: 'bold',
                        fill: theme.colors.shape,
                      }
                    }}
                    labelRadius={60}
                    x='percent'
                    y='total'
                  />
            </ChartContainer>        
              {totalByCategories.map((item) => (
                <HistoryCard
                key={item.key}
                title={item.name}
                amount={item.totalFormatted}
                color={item.color}
              />
              ))}
        </WrapperContent>
      }
    </Container>
  );
}