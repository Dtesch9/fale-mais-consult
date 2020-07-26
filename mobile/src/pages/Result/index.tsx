import React from 'react';

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

const Result: React.FC = () => {
  return (
    <Container>
      <Logo />

      <Wrapper>
        <Cards horizontal showsHorizontalScrollIndicator={false}>
          <Card>
            <CardTextOne>Plano escolhido</CardTextOne>
            <CardTextTwo>FaleMais</CardTextTwo>
            <CardTextThree>80</CardTextThree>
          </Card>

          <Card>
            <CardTextOne>Custo sem plano</CardTextOne>
            <CardTextTwo>FaleMais</CardTextTwo>
            <CardTextThree>80</CardTextThree>
          </Card>

          <Card>
            <CardTextOne>Custo com plano</CardTextOne>
            <CardTextTwo>FaleMais</CardTextTwo>
            <CardTextThree>0</CardTextThree>
          </Card>
        </Cards>
      </Wrapper>
    </Container>
  );
};

export default Result;
