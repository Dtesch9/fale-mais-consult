import styled, { keyframes } from 'styled-components';
import { FiArrowLeft } from 'react-icons/fi';

import logo from '../../assets/logo.png';

const fadeOutOpacity = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
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

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  position: relative;
`;

export const BackButton = styled(FiArrowLeft)`
  font-size: 24px;
  color: #ff9000;
  position: absolute;
  transition: all 200ms;
  left: calc(min(10vw, 300px));

  &:hover {
    opacity: 0.7;
  }

  @media (min-width: 1000px) {
    left: 40vw;
  }

  @media (min-width: 940px) {
    left: 30vw;
  }

  @media (min-width: 785px) {
    left: 15vw;
  }
`;

export const Logo = styled.img.attrs({
  src: logo,
})`
  width: 200px;
  height: 200px;

  animation: ${fadeOutOpacity} 3s;
`;

export const Wrapper = styled.div`
  width: 95%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 12px;
  height: 100%;
`;

export const Cards = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 130px;
  transition: all 1s;

  animation: ${apearFromLeft} 1.5s;

  @media (max-width: 682px) {
    margin-top: 0;
  }
`;

export const Card = styled.div`
  background: #312e38;
  border: 1px solid #ff4400;
  border-radius: 4px;
  box-shadow: 4px 4px 4px -2px #ff4400;
  height: 250px;
  width: 200px;
  margin: 8px;
  flex-shrink: 0;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  > h1 {
    margin-top: 12px;
    color: #ff6600;
    font-size: 24px;
    text-transform: uppercase;
  }

  > h2 {
    color: rgba(255, 255, 255, 0.4);
    font-size: 28px;
  }

  > h3 {
    color: #ff9000;
    font-size: 32px;
    box-shadow: 0px 2px 3px -2px #4d4d4d;
    line-height: 24px;
    margin-bottom: 24px;
  }
`;
