import React, { useCallback, useRef, useState } from 'react';

import { Container } from './styles';

const Input: React.FC = () => {
  const inputElementRef = useRef<HTMLInputElement>(null);

  const [isFocused, setIsFocused] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  return (
    <Container isFocused={Number(isFocused)}>
      <input
        ref={inputElementRef}
        type="number"
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
      />
    </Container>
  );
};

export default Input;
