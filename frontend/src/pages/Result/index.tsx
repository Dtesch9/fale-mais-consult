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

  useEffect(() => {
    if (!routeParams.state) {
      history.push('/');
    }
  }, [routeParams, history]);

  const formattedPrices = useMemo(() => {
    if (!routeParams.state) {
      return {};
    }

    const { plan, normal_price, plan_price } = routeParams.state;

    return {
      plan,
      normalPrice: formatCurrency(normal_price),
      planPrice: formatCurrency(plan_price),
    };
  }, [routeParams]);

  const handleGoBack = useCallback(() => {
    history.goBack();
  }, [history]);

  return (
    <Container>
      <Header>
        <BackButton data-testid="back-button" onClick={handleGoBack} />
        <Logo />
      </Header>

      <Wrapper>
        <Cards>
          <Card>
            <h1>Plano escolhido</h1>
            <h2>FaleMais</h2>
            <h3>{formattedPrices.plan}</h3>
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
