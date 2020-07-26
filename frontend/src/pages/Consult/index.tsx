import React, {
  useCallback,
  useState,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import { SubmitHandler, FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';

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
  time: number;
}

interface OriginData {
  id: string;
  origin: string;
}

interface DestinationData {
  id: string;
  destination: string;
}

interface ResultData {
  normal_price: number;
  plan: number;
  plan_price: number;
}

const Consult: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [origins, setOrigins] = useState<OriginData[]>([]);
  const [destinations, setDestinations] = useState<DestinationData[]>([]);

  const [originForm, setOriginForm] = useState('');
  const [destinationForm, setDestinationForm] = useState('');
  const [planForm, setPlanForm] = useState(0);

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
        const [originsResponse, destinationsResponse] = await Promise.all([
          api.get<OriginData[]>('/origins'),
          api.get<DestinationData[]>('/destinations'),
        ]);

        setOrigins(originsResponse.data);
        setDestinations(destinationsResponse.data);
      } catch (err) {
        toast('Erro inesperado, tente novamente mais tarde', {
          type: 'error',
          pauseOnHover: true,
          progressStyle: { backgroundColor: '#ff5544' },
        });
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleSubmitForm: SubmitHandler<FormData> = useCallback(
    async (data: { time: number }) => {
      try {
        formRef.current?.reset();

        if (!originForm || !destinationForm || !planForm || !data.time) {
          toast('Para realizar a consulta informe todos os campos', {
            type: 'warning',
            pauseOnHover: true,
            progressStyle: { backgroundColor: '#aa6411' },
          });

          return;
        }

        const { time } = data;

        if (time <= 0) {
          toast('O tempo precisa ser maior do que 0', {
            type: 'warning',
            pauseOnHover: true,
            progressStyle: { backgroundColor: '#aa6411' },
          });

          return;
        }

        const response = await api.get<ResultData>('/call_texs', {
          params: {
            origin: originForm,
            destination: destinationForm,
            plan: planForm,
            time: data.time,
          },
        });

        history.push({ pathname: '/result', state: { ...response.data } });

        toast('Consulta realizada com sucesso', {
          type: 'success',
          progressStyle: { backgroundColor: '#88dd88' },
        });
      } catch (err) {
        if (err.response?.status === 500) {
          toast('Erro inesperado, tente novamente mais tarde', {
            type: 'error',
            pauseOnHover: true,
            progressStyle: { backgroundColor: '#ff5544' },
          });
        }

        toast('A FaleMais não tem planos para esta origem com este destino', {
          type: 'error',
          pauseOnHover: true,
          progressStyle: { backgroundColor: '#ff5544' },
        });
      } finally {
        setSelectedOrigin({});
        setSelectedDestination({});
        setSelectedPlan({});
      }
    },
    [originForm, destinationForm, planForm, history],
  );

  const handleOrigin = useCallback((id: string, origin: string) => {
    setSelectedOrigin(prevState => ({ [id]: !prevState[id] }));
    setOriginForm(origin);
  }, []);

  const handleDestination = useCallback((id: string, destination: string) => {
    setSelectedDestination(prevState => ({ [id]: !prevState[id] }));
    setDestinationForm(destination);
  }, []);

  const handlePlan = useCallback((id: number, plan: number) => {
    setSelectedPlan(prevState => ({ [id]: !prevState[id] }));
    setPlanForm(plan);
  }, []);

  return (
    <Container>
      {loading ? (
        <Loading size={120} color="#ff4400" />
      ) : (
        <Wrapper>
          <Logo />
          <Form ref={formRef} onSubmit={handleSubmitForm}>
            <OriginContainer>
              <OriginText>Informe o DDD de origem</OriginText>

              <ButtonsList>
                {origins.map(({ id, origin }) => (
                  <ButtonBox
                    key={id}
                    selected={Number(selectedOrigin[id]) || 0}
                  >
                    <button
                      type="button"
                      onClick={() => handleOrigin(id, origin)}
                      data-testid={`origin-button-${id}`}
                    >
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
                  <ButtonBox
                    key={id}
                    selected={Number(selectedDestination[id] || 0)}
                  >
                    <button
                      type="button"
                      onClick={() => handleDestination(id, destination)}
                      data-testid={`destination-button-${id}`}
                    >
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
                  <ButtonBox
                    key={plan}
                    selected={Number(selectedPlan[index]) || 0}
                  >
                    <button
                      type="button"
                      onClick={() => handlePlan(index, plan)}
                      data-testid={`plan-button-${plan}`}
                    >
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
