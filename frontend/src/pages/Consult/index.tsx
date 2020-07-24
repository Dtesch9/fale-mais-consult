import React, { useCallback, useState } from 'react';
import { SubmitHandler } from '@unform/core';
import { Form } from '@unform/web';

import Input from '../../components/Input';
import Button from '../../components/Button';

import {
  Container,
  Logo,
  ButtonsList,
  ButtonBox,
  Wrapper,
  OriginContainer,
  OriginText,
  DestinationContainer,
  DestinationText,
  PlanContainer,
  PlanText,
} from './styles';

interface SelectedProps {
  [key: string]: boolean;
}

interface FormData {
  time: string;
}

const Consult: React.FC = () => {
  const [selected, setSelected] = useState<SelectedProps>({});

  const handleSubmitForm: SubmitHandler<FormData> = useCallback(data => {
    console.log(data);
  }, []);

  const handleButtonClick = useCallback(() => {
    console.log('click');
  }, []);

  return (
    <Container>
      <Wrapper>
        <Logo />
        <Form onSubmit={handleSubmitForm}>
          <OriginContainer>
            <OriginText>Informe o DDD de origem</OriginText>

            <ButtonsList>
              <ButtonBox>
                <button type="button" onClick={handleButtonClick}>
                  011
                </button>
              </ButtonBox>

              <ButtonBox>
                <button type="button" onClick={handleButtonClick}>
                  016
                </button>
              </ButtonBox>

              <ButtonBox>
                <button type="button" onClick={handleButtonClick}>
                  017
                </button>
              </ButtonBox>

              <ButtonBox>
                <button type="button" onClick={handleButtonClick}>
                  018
                </button>
              </ButtonBox>
            </ButtonsList>
          </OriginContainer>

          <DestinationContainer>
            <DestinationText>Informe o DDD de destino</DestinationText>

            <ButtonsList>
              <ButtonBox>
                <button type="button" onClick={handleButtonClick}>
                  011
                </button>
              </ButtonBox>

              <ButtonBox>
                <button type="button" onClick={handleButtonClick}>
                  016
                </button>
              </ButtonBox>

              <ButtonBox>
                <button type="button" onClick={handleButtonClick}>
                  017
                </button>
              </ButtonBox>

              <ButtonBox>
                <button type="button" onClick={handleButtonClick}>
                  018
                </button>
              </ButtonBox>
            </ButtonsList>
          </DestinationContainer>

          <PlanContainer>
            <PlanText>Informe seu Plano FaleMais</PlanText>

            <ButtonsList>
              <ButtonBox>
                <button type="button" onClick={handleButtonClick}>
                  30
                </button>
              </ButtonBox>

              <ButtonBox>
                <button type="button" onClick={handleButtonClick}>
                  60
                </button>
              </ButtonBox>

              <ButtonBox>
                <button type="button" onClick={handleButtonClick}>
                  120
                </button>
              </ButtonBox>
            </ButtonsList>
          </PlanContainer>

          <Input name="time" placeholder="Tempo em minutos ex: 30" />
          <Button>Consultar</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Consult;
