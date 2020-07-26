import React from 'react';
import { render, fireEvent, waitFor } from 'react-native-testing-library';

import Input from '../../components/Input';

jest.mock('@unform/core', () => ({
  useField: () => ({
    fieldName: 'name',
    defaultValue: '',
    error: '',
    registerField: jest.fn(),
  }),
}));

describe('Input Component', () => {
  it('should be able to render input component', () => {
    const { getByPlaceholder } = render(
      <Input name="name" placeholder="place-holder" />,
    );

    expect(getByPlaceholder('place-holder')).toBeTruthy();
  });

  it('should be able to hightlight on input focus', async () => {
    const { getByPlaceholder, getByTestId } = render(
      <Input name="name" placeholder="place-holder" />,
    );

    const inputElement = getByPlaceholder('place-holder');
    const inputContainer = getByTestId('input-container');
    const inputIconOne = getByTestId('input-icon-1');
    const inputIconTwo = getByTestId('input-icon-2');

    fireEvent(inputElement, 'focus');

    await waitFor(() => {
      expect(inputContainer).toHaveStyle({ borderColor: '#ff4400' });
      expect(inputIconOne).toHaveStyle({ color: '#ff4400' });
      expect(inputIconTwo).toHaveStyle({ color: '#ff4400' });
    });

    fireEvent(inputElement, 'blur');

    await waitFor(() => {
      expect(inputContainer).not.toHaveStyle({ borderColor: '#ff4400' });
      expect(inputIconOne).not.toHaveStyle({ color: '#ff4400' });
    });
  });

  it('should be able keep text highlight on blur when filled', async () => {
    const { getByPlaceholder, getByTestId } = render(
      <Input name="name" placeholder="place-holder" />,
    );

    const inputElement = getByPlaceholder('place-holder');
    const inputContainer = getByTestId('input-container');
    const inputIconOne = getByTestId('input-icon-1');
    const inputIconTwo = getByTestId('input-icon-2');

    fireEvent.changeText(inputElement, 30);

    fireEvent(inputElement, 'focus');
    fireEvent(inputElement, 'blur');

    await waitFor(() => {
      expect(inputContainer).not.toHaveStyle({ borderColor: '#ff4400' });
      expect(inputIconOne).toHaveStyle({ color: '#ff4400' });
      expect(inputIconTwo).toHaveStyle({ color: '#ff4400' });
    });
  });
});
