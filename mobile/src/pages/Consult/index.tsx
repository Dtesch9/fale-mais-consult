import React, {
  useMemo,
  useEffect,
  useState,
  useCallback,
  useRef,
} from 'react';
import { Alert, View, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SubmitHandler, FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';

import api from '../../services/api';

import Input from '../../components/Input';
import Button from '../../components/Button';

import {
  Container,
  Wrapper,
  Logo,
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
  const { navigate } = useNavigation();
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
        const [originsResponse, destinationsResponse] = await Promise.all([
          api.get<OriginData[]>('/origins'),
          api.get<DestinationData[]>('/destinations'),
        ]);

        setOrigins(originsResponse.data);
        setDestinations(destinationsResponse.data);
      } catch (err) {
        Alert.alert('Erro inesperado!', 'Tente novamente mais tarde');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleSubmitForm: SubmitHandler<FormData> = useCallback(
    async (data: { time: number }) => {
      try {
        setLoading(true);

        formRef.current?.reset();

        const { time } = data;

        if (time <= 0) {
          Alert.alert('Atenção!', 'O tempo precisa ser maior do que 0');

          return;
        }

        if (!originForm || !destinationForm || !planForm || !time) {
          Alert.alert(
            'Atenção!',
            'Para realizar a consulta informe todos os campos',
          );

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

        navigate('Result', { ...response.data });
      } catch (err) {
        if (err.response?.status === 500) {
          Alert.alert('Erro inesperado!', 'Tente novamente mais tarde');
        }

        Alert.alert(
          'Erro no seu plano!',
          'A FaleMais não tem planos para esta origem com este destino',
        );
      } finally {
        setSelectedOrigin({});
        setSelectedDestination({});
        setSelectedPlan({});
        setLoading(false);
      }
    },
    [originForm, destinationForm, planForm, navigate],
  );

  const handleOriginPress = useCallback((id: string, origin: string) => {
    setSelectedOrigin(prevState => ({ [id]: !prevState[id] }));
    setOriginForm(origin);
  }, []);

  const handleDestinationPress = useCallback(
    (id: string, destination: string) => {
      setSelectedDestination(prevState => ({ [id]: !prevState[id] }));
      setDestinationForm(destination);
    },
    [],
  );

  const handlePlanPress = useCallback((id: number, plan: number) => {
    setSelectedPlan(prevState => ({ [id]: !prevState[id] }));
    setPlanForm(plan);
  }, []);

  return (
    <Container enabled behavior={undefined}>
      <Wrapper
        contentContainerStyle={{
          alignItems: 'center',
        }}
        showsVerticalScrollIndicator={false}
      >
        <Logo />

        {loading ? (
          <View style={{ marginTop: '50%' }}>
            <ActivityIndicator size={70} color="#ff4400" />
          </View>
        ) : (
          <>
            <Form ref={formRef} onSubmit={handleSubmitForm}>
              <OriginContainer>
                <OriginText>Informe o DDD de origem</OriginText>

                <ButtonsList>
                  {origins.map(({ origin, id }, index) => (
                    <ButtonBox
                      key={id}
                      isFirst={index}
                      selected={Number(selectedOrigin[id]) || 0}
                    >
                      <CustomRectButton
                        onPress={() => handleOriginPress(id, origin)}
                        testID={`origin-button-${id}`}
                      >
                        <ButtonText selected={Number(selectedOrigin[id] || 0)}>
                          {origin}
                        </ButtonText>
                      </CustomRectButton>
                    </ButtonBox>
                  ))}
                </ButtonsList>
              </OriginContainer>

              <DestinationContainer>
                <DestinationText>Informe o DDD de destino</DestinationText>

                <ButtonsList>
                  {destinations.map(({ destination, id }, index) => (
                    <ButtonBox
                      key={id}
                      isFirst={index}
                      selected={Number(selectedDestination[id]) || 0}
                    >
                      <CustomRectButton
                        onPress={() => handleDestinationPress(id, destination)}
                        testID={`destination-button-${id}`}
                      >
                        <ButtonText
                          selected={Number(selectedDestination[id] || 0)}
                        >
                          {destination}
                        </ButtonText>
                      </CustomRectButton>
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
                      isFirst={index}
                      selected={Number(selectedPlan[index]) || 0}
                    >
                      <CustomRectButton
                        onPress={() => handlePlanPress(index, plan)}
                        testID={`plan-button-${plan}`}
                      >
                        <ButtonText selected={Number(selectedPlan[index] || 0)}>
                          {plan}
                        </ButtonText>
                      </CustomRectButton>
                    </ButtonBox>
                  ))}
                </ButtonsList>
              </PlanContainer>

              <Input
                name="time"
                placeholder="Tempo em minutos ex: 30"
                returnKeyLabel="send"
                returnKeyType="send"
                onSubmitEditing={() => formRef.current?.submitForm()}
              />

              <Button
                loading={loading}
                onPress={() => formRef.current?.submitForm()}
              >
                Consultar
              </Button>
            </Form>
          </>
        )}
      </Wrapper>
    </Container>
  );
};

export default Consult;
