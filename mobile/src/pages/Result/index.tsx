import React, { useMemo } from 'react';
import { useRoute } from '@react-navigation/native';

import { formatCurrency } from '../../utils/formatCurrency';

import {
  Container,
  Logo,
  Wrapper,
  Cards,
  Card,
  CardTextOne,
  CardTextTwo,
  CardTextThree,
} from './styles';

interface RouteParams {
  normal_price: number;
  plan: number;
  plan_price: number;
}

const Result: React.FC = () => {
  const { params } = useRoute();
  const routeParams = params as RouteParams;

  const formattedData = useMemo(() => {
    const { plan, normal_price, plan_price } = routeParams;

    return {
      plan,
      normalPrice: formatCurrency(normal_price),
      planPrice: formatCurrency(plan_price),
    };
  }, [routeParams]);

  return (
    <Container>
      <Logo />

      <Wrapper>
        <Cards horizontal showsHorizontalScrollIndicator={false}>
          <Card>
            <CardTextOne>Plano escolhido</CardTextOne>
            <CardTextTwo>FaleMais</CardTextTwo>
            <CardTextThree>{formattedData.plan}</CardTextThree>
          </Card>

          <Card>
            <CardTextOne>Custo sem plano</CardTextOne>
            <CardTextTwo>FaleMais</CardTextTwo>
            <CardTextThree>{formattedData.normalPrice}</CardTextThree>
          </Card>

          <Card>
            <CardTextOne>Custo com plano</CardTextOne>
            <CardTextTwo>FaleMais</CardTextTwo>
            <CardTextThree>{formattedData.planPrice}</CardTextThree>
          </Card>
        </Cards>
      </Wrapper>
    </Container>
  );
};

export default Result;
