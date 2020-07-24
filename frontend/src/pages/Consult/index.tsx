import React, { useCallback, useState, useEffect, useMemo } from 'react';
import { SubmitHandler } from '@unform/core';
import { Form } from '@unform/web';

import api from '../../services/api';

import Input from '../../components/Input';
import Button from '../../components/Button';
import Loading from '../../components/Loading';

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

interface OriginData {
  id: string;
  origin: string;
}

interface DestinationData {
  id: string;
  destination: string;
}

const Consult: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [origins, setOrigins] = useState<OriginData[]>([]);
  const [destinations, setDestinations] = useState<DestinationData[]>([]);

  const [selectedPlan, setSelectedPlan] = useState<SelectedProps>({});
  const [selectedOrigin, setSelectedOrigin] = useState<SelectedProps>({});
  const [selectedDestination, setSelectedDestination] = useState<SelectedProps>(
    {},
  );

  const plans = useMemo(() => {
    return [30, 60, 120];
  }, []);

  useEffect(() => {
    const loadData = async (): Promise<void> => {
      setLoading(true);

      try {
        await Promise.all([
          api.get<OriginData[]>('/origins').then(response => {
            setOrigins(response.data);
          }),
          api.get<DestinationData[]>('/destinations').then(response => {
            setDestinations(response.data);
          }),
        ]);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleSubmitForm: SubmitHandler<FormData> = useCallback(data => {
    console.log(data);
  }, []);

  const handleOrigin = useCallback(id => {
    setSelectedOrigin(prevState => ({ [id]: !prevState[id] }));
  }, []);

  const handleDestination = useCallback(id => {
    setSelectedDestination(prevState => ({ [id]: !prevState[id] }));
  }, []);

  const handlePlan = useCallback(id => {
    setSelectedPlan(prevState => ({ [id]: !prevState[id] }));
  }, []);

  return (
    <Container>
      {loading ? (
        <Loading size={120} color="#ff4400" />
      ) : (
        <Wrapper>
          <Logo />
          <Form onSubmit={handleSubmitForm}>
            <OriginContainer>
              <OriginText>Informe o DDD de origem</OriginText>

              <ButtonsList>
                {origins.map(({ id, origin }) => (
                  <ButtonBox selected={Number(selectedOrigin[id])}>
                    <button type="button" onClick={() => handleOrigin(id)}>
                      {origin}
                    </button>
                  </ButtonBox>
                ))}
              </ButtonsList>
            </OriginContainer>

            <DestinationContainer>
              <DestinationText>Informe o DDD de destino</DestinationText>

              <ButtonsList>
                {destinations.map(({ id, destination }) => (
                  <ButtonBox selected={Number(selectedDestination[id])}>
                    <button type="button" onClick={() => handleDestination(id)}>
                      {destination}
                    </button>
                  </ButtonBox>
                ))}
              </ButtonsList>
            </DestinationContainer>

            <PlanContainer>
              <PlanText>Informe seu Plano FaleMais</PlanText>

              <ButtonsList>
                {plans.map((plan, index) => (
                  <ButtonBox selected={Number(selectedPlan[index])}>
                    <button type="button" onClick={() => handlePlan(index)}>
                      {plan}
                    </button>
                  </ButtonBox>
                ))}
              </ButtonsList>
            </PlanContainer>

            <Input name="time" placeholder="Tempo em minutos ex: 30" />
            <Button>Consultar</Button>
          </Form>
        </Wrapper>
      )}
    </Container>
  );
};

export default Consult;
