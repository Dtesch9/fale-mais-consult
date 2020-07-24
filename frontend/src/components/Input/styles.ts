import styled from 'styled-components';

interface ContainerProps {
  isFocused: number;
  isFilled: number;
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  align-items: center;
  max-width: calc(min(424px, 100%));
  width: 45vh;
  height: 4.5vh;
  border: 1px solid ${({ isFocused }) => (isFocused ? '#ff7000' : '#999')};
  border-radius: 2px;
  transition: all 500ms;

  svg {
    margin: 0 8px 0 8px;
    font-size: 3vh;
    color: ${({ isFocused, isFilled }) =>
      isFocused || isFilled ? '#ff4400' : '#999'};
    transition: all 500ms;
  }

  input {
    width: 100%;
    height: 100%;
    background: #312e38;
    border: none;
    text-align: center;
    color: ${({ isFilled }) => (isFilled ? '#ff4400' : '#999')};

    &::placeholder {
      color: #666;
      font-size: calc(min(4.5vw, 20px));
    }

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
