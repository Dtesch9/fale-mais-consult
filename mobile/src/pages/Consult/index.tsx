import React, { useMemo } from 'react';

import {
  Container,
  Wrapper,
  Logo,
  Form,
  OriginContainer,
  OriginText,
  DestinationContainer,
  DestinationText,
  PlanContainer,
  PlanText,
  ButtonsList,
  ButtonBox,
  CustomRectButton,
  ButtonText,
} from './styles';

const Consult: React.FC = () => {
  const origins = useMemo(() => {
    return ['011', '016', '017', '018'];
  }, []);

  const destinations = useMemo(() => {
    return ['011', '016', '017', '018'];
  }, []);

  const plans = useMemo(() => {
    return ['30', '60', '120'];
  }, []);

  return (
    <Container>
      <Wrapper>
        <Logo />

        <Form>
          <OriginContainer>
            <OriginText>Informe o DDD de origem</OriginText>

            <ButtonsList>
              {origins.map((origin, index) => (
                <ButtonBox key={origin} isFirst={index}>
                  <CustomRectButton>
                    <ButtonText>{origin}</ButtonText>
                  </CustomRectButton>
                </ButtonBox>
              ))}
            </ButtonsList>
          </OriginContainer>

          <DestinationContainer>
            <DestinationText>Informe o DDD de destino</DestinationText>

            <ButtonsList>
              {destinations.map((destination, index) => (
                <ButtonBox key={`${destination}${index}`} isFirst={index}>
                  <CustomRectButton>
                    <ButtonText>{destination}</ButtonText>
                  </CustomRectButton>
                </ButtonBox>
              ))}
            </ButtonsList>
          </DestinationContainer>

          <PlanContainer>
            <PlanText>Informe su Plano FaleMais</PlanText>

            <ButtonsList>
              {plans.map((plan, index) => (
                <ButtonBox key={plan} isFirst={index}>
                  <CustomRectButton>
                    <ButtonText>{plan}</ButtonText>
                  </CustomRectButton>
                </ButtonBox>
              ))}
            </ButtonsList>
          </PlanContainer>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Consult;
