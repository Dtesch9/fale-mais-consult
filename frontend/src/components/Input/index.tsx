import React, { useCallback, useRef, useState, useEffect } from 'react';
import { useField } from '@unform/core';
import { FiClock } from 'react-icons/fi';

import { Container } from './styles';

interface Props {
  name: string;
}

type InputProps = JSX.IntrinsicElements['input'] & Props;

const Input: React.FC<InputProps> = ({ name, ...rest }) => {
  const inputElementRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const { fieldName, defaultValue, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      path: 'value',
      ref: inputElementRef.current,
    });
  }, [registerField, fieldName]);

  const handleInputFocus = useCallback(() => {
    setIsFilled(false);
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFilled(!!inputElementRef.current?.value);
    setIsFocused(false);
  }, []);

  return (
    <Container isFocused={Number(isFocused)} isFilled={Number(isFilled)}>
      <FiClock />

      <input
        ref={inputElementRef}
        defaultValue={defaultValue}
        type="number"
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        {...rest}
      />

      <FiClock />
    </Container>
  );
};

export default Input;
