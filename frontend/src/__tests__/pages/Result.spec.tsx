import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react';

import Result from '../../pages/Result';

const mockPush = jest.fn();
const mockGoBack = jest.fn();

let mockState = {} || undefined;

jest.mock('react-router-dom', () => {
  return {
    useHistory: () => ({
      push: mockPush,
      goBack: mockGoBack,
    }),
    useLocation: () => ({
      state: mockState,
    }),
  };
});

describe('Result page', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    mockState = {
      plan: 120,
      normal_price: 120,
      plan_price: 0,
    };
  });

  it('should render Result page', async () => {
    const { getByText } = render(<Result />);

    await waitFor(() => {
      expect(getByText('Plano escolhido')).toBeTruthy();
    });

    expect(getByText('120')).toBeTruthy();
    expect(getByText('R$120.00')).toBeTruthy();
    expect(getByText('R$0.00')).toBeTruthy();
  });

  it('should render redirect to "/" if params empty', async () => {
    mockState = undefined;

    render(<Result />);

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/');
    });
  });

  it('should be able to go back to the previous page', async () => {
    const { getByTestId } = render(<Result />);

    fireEvent.click(getByTestId('back-button'));

    expect(mockGoBack).toHaveBeenCalledTimes(1);
  });
});
