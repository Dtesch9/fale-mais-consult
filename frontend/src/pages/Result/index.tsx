import React, { useEffect, useMemo, useCallback } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

import { formatCurrency } from '../../utils/formatCurrency';

import {
  Container,
  Wrapper,
  BackButton,
  Logo,
  Cards,
  Card,
  Header,
} from './styles';

interface RouteParams {
  normal_price: number;
  plan: number;
  plan_price: number;
}

const Result: React.FC = () => {
  const routeParams = useLocation<RouteParams>();
  const history = useHistory();

  const { plan, normal_price, plan_price } = routeParams?.state;

  const formattedPrices = useMemo(() => {
    return {
      normalPrice: formatCurrency(normal_price),
      planPrice: formatCurrency(plan_price),
    };
  }, [normal_price, plan_price]);

  useEffect(() => {
    if (!routeParams.state) {
      history.push('/');
    }
  }, [routeParams, history]);

  const handleGoBack = useCallback(() => {
    history.goBack();
  }, [history]);

  return (
    <Container>
      <Header>
        <BackButton onClick={handleGoBack} />
        <Logo />
      </Header>

      <Wrapper>
        <Cards>
          <Card>
            <h1>Plano escolhido</h1>
            <h2>FaleMais</h2>
            <h3>{plan}</h3>
          </Card>

          <Card>
            <h1>Custo sem plano</h1>
            <h2>FaleMais</h2>
            <h3>{formattedPrices.normalPrice}</h3>
          </Card>
          <Card>
            <h1>Custo com plano</h1>
            <h2>FaleMais</h2>
            <h3>{formattedPrices.planPrice}</h3>
          </Card>
        </Cards>
      </Wrapper>
    </Container>
  );
};

export default Result;
