import React from 'react';
import { Alert } from 'react-native';
import MockAdapter from 'axios-mock-adapter';
import { render, waitFor, fireEvent } from 'react-native-testing-library';

import api from '../../services/api';

import Consult from '../../pages/Consult';

const mockApi = new MockAdapter(api);

type MockResponse = [string, string, number, any?];

const alertSpy = jest.spyOn(Alert, 'alert');

const mockNavigate = jest.fn();

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}));

describe('Consult page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockApi.reset();
  });

  it('should render Consult page', async () => {
    const origins = [
      { id: 'id-1', origin: '011' },
      { id: 'id-2', origin: '016' },
      { id: 'id-3', origin: '017' },
      { id: 'id-4', origin: '018' },
    ];

    const destinations = [
      { id: 'id-5', origin: '011' },
      { id: 'id-6', origin: '016' },
      { id: 'id-7', origin: '017' },
      { id: 'id-8', origin: '018' },
    ];

    const responses: MockResponse[] = [
      ['GET', '/origins', 200, origins],
      ['GET', '/destinations', 200, destinations],
    ];

    mockApi.onAny().reply(config => {
      const result = responses.shift();

      const [method, url, ...response] = result as MockResponse;

      if (config.url === url && config.method?.toUpperCase() === method) {
        return response;
      }

      return [500, {}];
    });

    const { getByText } = render(<Consult />);

    await waitFor(() => {
      expect(getByText('Informe o DDD de destino')).toBeTruthy();
    });

    expect(getByText('011')).toBeTruthy();
    expect(getByText('016')).toBeTruthy();
    expect(getByText('017')).toBeTruthy();
    expect(getByText('018')).toBeTruthy();
  });

  it('should display an Alert message if api call fails', async () => {
    const responses: MockResponse[] = [
      ['GET', '/origins', 400],
      ['GET', '/destinations', 500],
    ];

    mockApi.onAny().reply(config => {
      const result = responses.shift();

      const [method, url, ...response] = result as MockResponse;

      if (config.url === url && config.method?.toUpperCase() === method) {
        return response;
      }

      return [500, {}];
    });

    const { getByText, queryByText } = render(<Consult />);

    await waitFor(() => {
      expect(getByText('Informe o DDD de destino')).toBeTruthy();
    });

    expect(queryByText('011')).toBeFalsy();
    expect(queryByText('016')).toBeFalsy();
    expect(queryByText('017')).toBeFalsy();
    expect(queryByText('018')).toBeFalsy();

    expect(alertSpy).toHaveBeenCalledWith(
      'Erro inesperado!',
      'Tente novamente mais tarde',
    );
  });

  it('should be able to consult prices', async () => {
    const origins = [
      { id: 'id-1', origin: '011' },
      { id: 'id-2', origin: '016' },
      { id: 'id-3', origin: '017' },
      { id: 'id-4', origin: '018' },
    ];

    const destinations = [
      { id: 'id-5', destination: '011' },
      { id: 'id-6', destination: '016' },
      { id: 'id-7', destination: '017' },
      { id: 'id-8', destination: '018' },
    ];

    const callTexs = { normal_price: 30, plan: 30, plan_price: 0 };

    const responses: MockResponse[] = [
      ['GET', '/origins', 200, origins],
      ['GET', '/destinations', 200, destinations],
      ['GET', '/call_texs', 200, callTexs],
    ];

    mockApi.onAny().reply(config => {
      const result = responses.shift();

      const [method, url, ...response] = result as MockResponse;

      if (config.url === url && config.method?.toUpperCase() === method) {
        return response;
      }

      return [500, {}];
    });

    const { getByText, getByTestId, getByPlaceholder } = render(<Consult />);

    await waitFor(() => {
      expect(getByText('Informe o DDD de destino')).toBeTruthy();
    });

    expect(getByTestId('origin-button-id-1')).toBeTruthy();
    expect(getByTestId('destination-button-id-8')).toBeTruthy();

    await waitFor(() => {
      fireEvent.press(getByTestId('origin-button-id-4'));
      fireEvent.press(getByTestId('destination-button-id-5'));
      fireEvent.press(getByTestId('plan-button-30'));
    });

    const timeInputElement = getByPlaceholder('Tempo em minutos ex: 30');

    fireEvent.changeText(timeInputElement, 30);

    fireEvent.press(getByText('Consultar'));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('Result', callTexs);
    });
  });

  it('should display an Alert message if origin/destination/time has not been informed', async () => {
    const origins = [
      { id: 'id-1', origin: '011' },
      { id: 'id-2', origin: '016' },
      { id: 'id-3', origin: '017' },
      { id: 'id-4', origin: '018' },
    ];

    const destinations = [
      { id: 'id-5', destination: '011' },
      { id: 'id-6', destination: '016' },
      { id: 'id-7', destination: '017' },
      { id: 'id-8', destination: '018' },
    ];

    const responses: MockResponse[] = [
      ['GET', '/origins', 200, origins],
      ['GET', '/destinations', 200, destinations],
    ];

    mockApi.onAny().reply(config => {
      const result = responses.shift();

      const [method, url, ...response] = result as MockResponse;

      if (config.url === url && config.method?.toUpperCase() === method) {
        return response;
      }

      return [500, {}];
    });

    const { getByText, getByTestId, getByPlaceholder } = render(<Consult />);

    await waitFor(() => {
      expect(getByText('Informe o DDD de destino')).toBeTruthy();
    });

    expect(getByTestId('origin-button-id-1')).toBeTruthy();
    expect(getByTestId('destination-button-id-8')).toBeTruthy();

    await waitFor(() => {
      fireEvent.press(getByTestId('destination-button-id-5'));
      fireEvent.press(getByTestId('plan-button-30'));
    });

    const timeInputElement = getByPlaceholder('Tempo em minutos ex: 30');

    fireEvent.changeText(timeInputElement, 30);

    fireEvent.press(getByText('Consultar'));

    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith(
        'Atenção!',
        'Para realizar a consulta informe todos os campos',
      );
    });

    await waitFor(() => {
      fireEvent.press(getByTestId('origin-button-id-4'));
      fireEvent.press(getByTestId('plan-button-30'));
    });

    fireEvent.changeText(getByPlaceholder('Tempo em minutos ex: 30'), 30);

    fireEvent.press(getByText('Consultar'));

    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith(
        'Atenção!',
        'Para realizar a consulta informe todos os campos',
      );
    });

    await waitFor(() => {
      fireEvent.press(getByTestId('origin-button-id-4'));
      fireEvent.press(getByTestId('destination-button-id-5'));
      fireEvent.press(getByTestId('plan-button-30'));
    });

    fireEvent.press(getByText('Consultar'));

    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith(
        'Atenção!',
        'Para realizar a consulta informe todos os campos',
      );
    });
  });

  it('should display an Alert message if time less than or equal to zero', async () => {
    const origins = [
      { id: 'id-1', origin: '011' },
      { id: 'id-2', origin: '016' },
      { id: 'id-3', origin: '017' },
      { id: 'id-4', origin: '018' },
    ];

    const destinations = [
      { id: 'id-5', destination: '011' },
      { id: 'id-6', destination: '016' },
      { id: 'id-7', destination: '017' },
      { id: 'id-8', destination: '018' },
    ];

    const responses: MockResponse[] = [
      ['GET', '/origins', 200, origins],
      ['GET', '/destinations', 200, destinations],
    ];

    mockApi.onAny().reply(config => {
      const result = responses.shift();

      const [method, url, ...response] = result as MockResponse;

      if (config.url === url && config.method?.toUpperCase() === method) {
        return response;
      }

      return [500, {}];
    });

    const { getByText, getByTestId, getByPlaceholder } = render(<Consult />);

    await waitFor(() => {
      expect(getByText('Informe o DDD de destino')).toBeTruthy();
    });

    expect(getByTestId('origin-button-id-1')).toBeTruthy();
    expect(getByTestId('destination-button-id-8')).toBeTruthy();

    await waitFor(() => {
      fireEvent.press(getByTestId('origin-button-id-4'));
      fireEvent.press(getByTestId('destination-button-id-5'));
      fireEvent.press(getByTestId('plan-button-30'));
    });

    const timeInputElement = getByPlaceholder('Tempo em minutos ex: 30');

    fireEvent.changeText(timeInputElement, 0);

    fireEvent.press(getByText('Consultar'));

    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith(
        'Atenção!',
        'Para realizar a consulta informe todos os campos',
      );
    });
  });

  it('should display an Alert message if api call return statusCode 500', async () => {
    const origins = [
      { id: 'id-1', origin: '011' },
      { id: 'id-2', origin: '016' },
      { id: 'id-3', origin: '017' },
      { id: 'id-4', origin: '018' },
    ];

    const destinations = [
      { id: 'id-5', destination: '011' },
      { id: 'id-6', destination: '016' },
      { id: 'id-7', destination: '017' },
      { id: 'id-8', destination: '018' },
    ];

    const responses: MockResponse[] = [
      ['GET', '/origins', 200, origins],
      ['GET', '/destinations', 200, destinations],
      ['GET', '/destinations', 500],
    ];

    mockApi.onAny().reply(config => {
      const result = responses.shift();

      const [method, url, ...response] = result as MockResponse;

      if (config.url === url && config.method?.toUpperCase() === method) {
        return response;
      }

      return [500, {}];
    });

    const { getByText, getByTestId, getByPlaceholder } = render(<Consult />);

    await waitFor(() => {
      expect(getByText('Informe o DDD de destino')).toBeTruthy();
    });

    expect(getByTestId('origin-button-id-1')).toBeTruthy();
    expect(getByTestId('destination-button-id-8')).toBeTruthy();

    await waitFor(() => {
      fireEvent.press(getByTestId('origin-button-id-4'));
      fireEvent.press(getByTestId('destination-button-id-5'));
      fireEvent.press(getByTestId('plan-button-30'));
    });

    const timeInputElement = getByPlaceholder('Tempo em minutos ex: 30');

    fireEvent.changeText(timeInputElement, 30);

    fireEvent.press(getByText('Consultar'));

    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith(
        'Erro inesperado!',
        'Tente novamente mais tarde',
      );
    });
  });

  it('should be able to submit with onSubmitEditing', async () => {
    const origins = [
      { id: 'id-1', origin: '011' },
      { id: 'id-2', origin: '016' },
      { id: 'id-3', origin: '017' },
      { id: 'id-4', origin: '018' },
    ];

    const destinations = [
      { id: 'id-5', destination: '011' },
      { id: 'id-6', destination: '016' },
      { id: 'id-7', destination: '017' },
      { id: 'id-8', destination: '018' },
    ];

    const responses: MockResponse[] = [
      ['GET', '/origins', 200, origins],
      ['GET', '/destinations', 200, destinations],
      ['GET', '/destinations', 500],
    ];

    mockApi.onAny().reply(config => {
      const result = responses.shift();

      const [method, url, ...response] = result as MockResponse;

      if (config.url === url && config.method?.toUpperCase() === method) {
        return response;
      }

      return [500, {}];
    });

    const { getByText, getByTestId, getByPlaceholder } = render(<Consult />);

    await waitFor(() => {
      expect(getByText('Informe o DDD de destino')).toBeTruthy();
    });

    expect(getByTestId('origin-button-id-1')).toBeTruthy();
    expect(getByTestId('destination-button-id-8')).toBeTruthy();

    await waitFor(() => {
      fireEvent.press(getByTestId('origin-button-id-4'));
      fireEvent.press(getByTestId('destination-button-id-5'));
      fireEvent.press(getByTestId('plan-button-30'));
    });

    const timeInputElement = getByPlaceholder('Tempo em minutos ex: 30');

    await waitFor(() => {
      fireEvent.changeText(timeInputElement, 30);

      fireEvent(timeInputElement, 'onSubmitEditing');
    });

    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith(
        'Erro inesperado!',
        'Tente novamente mais tarde',
      );
    });
  });
});
