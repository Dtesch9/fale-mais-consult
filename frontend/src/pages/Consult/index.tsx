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

const Consult: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

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

  const handleSubmitForm: SubmitHandler<FormData> = useCallback(
    async (data: { time: number }) => {
      try {
        formRef.current?.reset();

        if (!originForm || !destinationForm || !planForm) {
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

        const results = await api.get('/call_texs', {
          params: {
            origin: originForm,
            destination: destinationForm,
            plan: planForm,
            time: data.time,
          },
        });

        toast('Consulta realizada com sucesso', {
          type: 'success',
          progressStyle: { backgroundColor: '#88dd88' },
        });
      } catch (err) {
        if (err.response.status === 500) {
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
    [originForm, destinationForm, planForm],
  );

  const handleOrigin = useCallback((id, origin) => {
    setSelectedOrigin(prevState => ({ [id]: !prevState[id] }));
    setOriginForm(origin);
  }, []);

  const handleDestination = useCallback((id, destination) => {
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
                  <ButtonBox selected={Number(selectedOrigin[id])}>
                    <button
                      type="button"
                      onClick={() => handleOrigin(id, origin)}
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
                  <ButtonBox selected={Number(selectedDestination[id])}>
                    <button
                      type="button"
                      onClick={() => handleDestination(id, destination)}
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
                  <ButtonBox selected={Number(selectedPlan[index])}>
                    <button
                      type="button"
                      onClick={() => handlePlan(index, plan)}
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
