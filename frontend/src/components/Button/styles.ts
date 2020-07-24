import styled, { css } from 'styled-components';

export const Container = styled.button`
  margin-top: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: calc(min(424px, 100%));
  width: 45vh;
  height: 4.5vh;
  border: 2px solid #ff6000;
  border-radius: 4px;
  color: #999;
  background: none;
  transition: all 400ms;

  ${({ disabled }) =>
    disabled &&
    css`
      pointer-events: none;
      cursor: not-allowed;
    `}

  &:hover {
    ${({ disabled }) =>
      !disabled &&
      css`
        background: #ff6000;
        color: #fff;
      `}
  }
`;
