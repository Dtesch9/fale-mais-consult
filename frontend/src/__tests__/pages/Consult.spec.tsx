import React from 'react';
import MockAdapter from 'axios-mock-adapter';
import { render, waitFor, act, fireEvent } from '@testing-library/react';
import * as toastify from 'react-toastify';

import api from '../../services/api';

import Consult from '../../pages/Consult';

const mockApi = new MockAdapter(api);

type MockResponse = [string, string, number, any?];

const toastSpy = jest.spyOn(toastify, 'toast');

const mockPush = jest.fn();

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: mockPush,
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

  it('should display an toast message if api call fails', async () => {
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

    expect(toastSpy).toHaveBeenCalledWith(
      'Erro inesperado, tente novamente mais tarde',
      {
        type: 'error',
        pauseOnHover: true,
        progressStyle: { backgroundColor: '#ff5544' },
      },
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

    const { getByText, getByTestId, getByPlaceholderText } = render(
      <Consult />,
    );

    await waitFor(() => {
      expect(getByText('Informe o DDD de destino')).toBeTruthy();
    });

    expect(getByTestId('origin-button-id-1')).toBeTruthy();
    expect(getByTestId('destination-button-id-8')).toBeTruthy();

    await act(async () => {
      fireEvent.click(getByTestId('origin-button-id-4'));
      fireEvent.click(getByTestId('destination-button-id-5'));
      fireEvent.click(getByTestId('plan-button-30'));
    });

    const timeInputElement = getByPlaceholderText('Tempo em minutos ex: 30');

    fireEvent.change(timeInputElement, { target: { value: 30 } });

    fireEvent.click(getByText('Consultar'));

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith({
        pathname: '/result',
        state: callTexs,
      });

      expect(toastSpy).toHaveBeenCalledWith('Consulta realizada com sucesso', {
        progressStyle: { backgroundColor: '#88dd88' },
        type: 'success',
      });
    });
  });

  it('should display an toast message if origin/destination/time has not been informed', async () => {
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

    const { getByText, getByTestId, getByPlaceholderText } = render(
      <Consult />,
    );

    await waitFor(() => {
      expect(getByText('Informe o DDD de destino')).toBeTruthy();
    });

    expect(getByTestId('origin-button-id-1')).toBeTruthy();
    expect(getByTestId('destination-button-id-8')).toBeTruthy();

    // origin not informed
    await act(async () => {
      fireEvent.click(getByTestId('destination-button-id-5'));
      fireEvent.click(getByTestId('plan-button-30'));
    });

    const timeInputElement = getByPlaceholderText('Tempo em minutos ex: 30');

    fireEvent.change(timeInputElement, { target: { value: 30 } });

    fireEvent.click(getByText('Consultar'));

    await waitFor(() => {
      expect(toastSpy).toHaveBeenCalledWith(
        'Para realizar a consulta informe todos os campos',
        {
          type: 'warning',
          pauseOnHover: true,
          progressStyle: { backgroundColor: '#aa6411' },
        },
      );
    });

    // destination not informed
    await act(async () => {
      fireEvent.click(getByTestId('origin-button-id-4'));
      fireEvent.click(getByTestId('plan-button-30'));
    });

    fireEvent.change(timeInputElement, { target: { value: 30 } });

    fireEvent.click(getByText('Consultar'));

    await waitFor(() => {
      expect(toastSpy).toHaveBeenCalledWith(
        'Para realizar a consulta informe todos os campos',
        {
          type: 'warning',
          pauseOnHover: true,
          progressStyle: { backgroundColor: '#aa6411' },
        },
      );
    });

    // plan not informed
    await act(async () => {
      fireEvent.click(getByTestId('origin-button-id-4'));
      fireEvent.click(getByTestId('destination-button-id-5'));
    });

    fireEvent.change(timeInputElement, { target: { value: 30 } });

    fireEvent.click(getByText('Consultar'));

    await waitFor(() => {
      expect(toastSpy).toHaveBeenCalledWith(
        'Para realizar a consulta informe todos os campos',
        {
          type: 'warning',
          pauseOnHover: true,
          progressStyle: { backgroundColor: '#aa6411' },
        },
      );
    });

    // time not informed
    await act(async () => {
      fireEvent.click(getByTestId('origin-button-id-4'));
      fireEvent.click(getByTestId('destination-button-id-5'));
      fireEvent.click(getByTestId('plan-button-30'));
    });

    fireEvent.click(getByText('Consultar'));

    await waitFor(() => {
      expect(toastSpy).toHaveBeenCalledWith(
        'Para realizar a consulta informe todos os campos',
        {
          type: 'warning',
          pauseOnHover: true,
          progressStyle: { backgroundColor: '#aa6411' },
        },
      );
    });
  });

  it('should display an toast message if time less than or equal to zero', async () => {
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

    const { getByText, getByTestId, getByPlaceholderText } = render(
      <Consult />,
    );

    await waitFor(() => {
      expect(getByText('Informe o DDD de destino')).toBeTruthy();
    });

    expect(getByTestId('origin-button-id-1')).toBeTruthy();
    expect(getByTestId('destination-button-id-8')).toBeTruthy();

    await act(async () => {
      fireEvent.click(getByTestId('origin-button-id-4'));
      fireEvent.click(getByTestId('destination-button-id-5'));
      fireEvent.click(getByTestId('plan-button-30'));
    });

    const timeInputElement = getByPlaceholderText('Tempo em minutos ex: 30');

    fireEvent.change(timeInputElement, { target: { value: 0 } });

    fireEvent.click(getByText('Consultar'));

    await waitFor(() => {
      expect(toastSpy).toHaveBeenCalledWith(
        'O tempo precisa ser maior do que 0',
        {
          type: 'warning',
          pauseOnHover: true,
          progressStyle: { backgroundColor: '#aa6411' },
        },
      );
    });

    await act(async () => {
      fireEvent.click(getByTestId('origin-button-id-4'));
      fireEvent.click(getByTestId('destination-button-id-5'));
      fireEvent.click(getByTestId('plan-button-30'));
    });

    fireEvent.change(timeInputElement, { target: { value: -1 } });

    fireEvent.click(getByText('Consultar'));

    await waitFor(() => {
      expect(toastSpy).toHaveBeenCalledWith(
        'O tempo precisa ser maior do que 0',
        {
          type: 'warning',
          pauseOnHover: true,
          progressStyle: { backgroundColor: '#aa6411' },
        },
      );
    });
  });

  it('should display an toast message if api call return statusCode 500', async () => {
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

    const { getByText, getByTestId, getByPlaceholderText } = render(
      <Consult />,
    );

    await waitFor(() => {
      expect(getByText('Informe o DDD de destino')).toBeTruthy();
    });

    expect(getByTestId('origin-button-id-1')).toBeTruthy();
    expect(getByTestId('destination-button-id-8')).toBeTruthy();

    await act(async () => {
      fireEvent.click(getByTestId('origin-button-id-4'));
      fireEvent.click(getByTestId('destination-button-id-5'));
      fireEvent.click(getByTestId('plan-button-30'));
    });

    const timeInputElement = getByPlaceholderText('Tempo em minutos ex: 30');

    fireEvent.change(timeInputElement, { target: { value: 30 } });

    fireEvent.click(getByText('Consultar'));

    await waitFor(() => {
      expect(toastSpy).toHaveBeenCalledWith(
        'Erro inesperado, tente novamente mais tarde',
        {
          type: 'error',
          pauseOnHover: true,
          progressStyle: { backgroundColor: '#ff5544' },
        },
      );
    });
  });
});
