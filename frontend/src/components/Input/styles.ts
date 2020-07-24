import styled from 'styled-components';

interface ContainerProps {
  isFocused: number;
}

export const Container = styled.div<ContainerProps>`
  max-width: calc(min(424px, 100%));
  width: 45vh;
  height: 4vh;
  border: 1px solid ${({ isFocused }) => (isFocused ? '#ff9000' : '#999')};

  input {
    width: 100%;
    height: 100%;
    background: #312e38;
    border: none;

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    &[type='number'] {
      -moz-appearance: textfield;
    }
  }
`;
