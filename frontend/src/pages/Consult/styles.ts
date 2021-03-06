import styled, { keyframes, css } from 'styled-components';

import logo from '../../assets/logo.png';

interface BoxButtonProps {
  selected: number;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Wrapper = styled.div`
  width: 95%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 12px;

  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const apearFromRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(-100px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const apearFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(100px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const fadeOutOpacity = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const borderColor = keyframes`
  from {
    border-color: #999;
  }
  to {
    border-color: #ff4400;
  }
`;

export const Logo = styled.img.attrs({
  src: logo,
})`
  width: 200px;
  height: 200px;

  animation: ${fadeOutOpacity} 3s;
`;

export const OriginContainer = styled.section`
  display: flex;
  flex-direction: column;
  max-width: calc(min(424px, 100%));

  animation: ${apearFromRight} 1s;
`;

export const DestinationContainer = styled.section`
  display: flex;
  flex-direction: column;
  max-width: calc(min(424px, 100%));

  animation: ${apearFromLeft} 1s;
`;

export const PlanContainer = styled.section`
  display: flex;
  flex-direction: column;
  max-width: calc(min(316px, 100%));
  margin-bottom: 24px;
`;

export const OriginText = styled.h1`
  margin-bottom: 20px;
  color: rgba(255, 255, 255, 0.4);
  font-size: 3vh;

  animation: ${fadeOutOpacity} 2s;
`;

export const DestinationText = styled.h1`
  text-align: right;
  color: rgba(255, 255, 255, 0.4);
  margin: 20px 0 20px;
  font-size: 3vh;

  animation: ${fadeOutOpacity} 2s;
`;

export const PlanText = styled.h2`
  text-align: center;
  color: rgba(255, 255, 255, 0.4);
  margin: 20px 0 20px;
  font-size: 3vh;

  animation: ${fadeOutOpacity} 2s;
`;

export const ButtonsList = styled.ul`
  display: flex;
  justify-content: center;
`;

export const ButtonBox = styled.li<BoxButtonProps>`
  width: calc(min(11vh, 200px));
  height: calc(min(12vh, 200px));
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #ff4400;
  ${({ selected }) =>
    selected &&
    css`
      border-color: #ff9000;
    `}
  border-radius: 4px;
  transition: all 500ms;

  animation: ${borderColor} 3s;

  & + li {
    margin-left: 8px;
  }

  &:hover {
    ${({ selected }) =>
      !selected
        ? css`
            border-right-color: #a10500;
            border-bottom-color: #a10500;
          `
        : css`
            border-left-color: #a10500;
            border-top-color: #a10500;
          `}

    button {
      color: #ff4400;
    }
  }

  button {
    color: white;
    width: 100%;
    height: 100%;
    transition: all 100ms;

    ${({ selected }) =>
      selected &&
      css`
        color: #ff4400;
        border-color: #ff9000;
      `}
  }
`;
