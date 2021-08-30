import React from 'react';
import { categories } from '~/utils/categories';
import {
  Container,
  Title,
  Amount,
  Footer,
  Icon,
  CategoryName,
  Category,
  DateTransaction,

} from './styles';

export interface TransactionsCardsProps {
  type: 'positive' | 'negative';
  name: string;
  amount: string;
  category: string;
  date: string;
}

interface Props {
  data: TransactionsCardsProps
}

export function TransactionsCards({data}: Props){
  const [category] = categories.filter((item) => item.key === data.category)
  return(
    <Container>
        <Title>{data.name}</Title>
        <Amount type={data.type}>
          {data.type === 'negative' && '- '}
          {data.amount}
          </Amount>
        <Footer>
          <Category>
            <Icon name={category.icon} />
            <CategoryName>{category.name}</CategoryName>
          </Category>
          <DateTransaction>{data.date}</DateTransaction>
        </Footer>
    </Container>
  )
}