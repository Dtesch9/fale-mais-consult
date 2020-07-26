import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';

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
    const { getByPlaceholderText } = render(
      <Input name="name" placeholder="place-holder" />,
    );

    expect(getByPlaceholderText('place-holder')).toBeTruthy();
  });

  it('should be able to hightlight on input focus', async () => {
    const { getByPlaceholderText, getByTestId } = render(
      <Input name="name" placeholder="place-holder" />,
    );

    const inputElement = getByPlaceholderText('place-holder');
    const inputContainer = getByTestId('input-container');
    const inputIcon = getByTestId('input-icon');

    fireEvent.focus(inputElement);

    await waitFor(() => {
      expect(inputContainer).toHaveStyle('border-color: #ff4400;');
      expect(inputIcon).toHaveStyle('color: #ff4400;');
    });

    fireEvent.blur(inputElement);

    await waitFor(() => {
      expect(inputContainer).not.toHaveStyle('border-color: #ff4400;');
      expect(inputIcon).not.toHaveStyle('color: #ff4400;');
    });
  });

  it('should be able keep text highlight on blur when filled', async () => {
    const { getByPlaceholderText, getByTestId } = render(
      <Input name="name" placeholder="place-holder" />,
    );

    const inputElement = getByPlaceholderText('place-holder');
    const inputContainer = getByTestId('input-container');
    const inputIcon = getByTestId('input-icon');

    fireEvent.change(inputElement, { target: { value: 30 } });

    fireEvent.focus(inputElement);
    fireEvent.blur(inputElement);

    await waitFor(() => {
      expect(inputContainer).not.toHaveStyle('border-color: #ff4400;');
      expect(inputIcon).toHaveStyle('color: #ff4400;');
    });
  });
});
