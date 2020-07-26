import React from 'react';
import { render, waitFor } from 'react-native-testing-library';

import Result from '../../pages/Result';

jest.mock('@react-navigation/native', () => {
  return {
    useRoute: () => ({
      params: {
        plan: 120,
        normal_price: 120,
        plan_price: 0,
      },
    }),
  };
});

describe('Result page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should be able to render Result page', async () => {
    const { getByText } = render(<Result />);

    await waitFor(() => {
      expect(getByText('Plano escolhido')).toBeTruthy();
    });

    expect(getByText('120')).toBeTruthy();
    expect(getByText('R$120.00')).toBeTruthy();
    expect(getByText('R$0.00')).toBeTruthy();
  });
});
