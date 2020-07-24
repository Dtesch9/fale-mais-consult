import styled from 'styled-components';

import logo from '../../assets/logo.png';

export const Container = styled.div`
  height: 100vh;
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
`;

export const Logo = styled.img.attrs({
  src: logo,
})`
  width: 200px;
  height: 200px;
`;

export const OriginContainer = styled.section`
  display: flex;
  flex-direction: column;
  max-width: calc(min(424px, 100%));
`;

export const DestinationContainer = styled.section`
  display: flex;
  flex-direction: column;
  max-width: calc(min(424px, 100%));
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
`;

export const DestinationText = styled.h1`
  text-align: right;
  color: rgba(255, 255, 255, 0.4);
  margin: 20px 0 20px;
  font-size: 3vh;
`;

export const PlanText = styled.h2`
  text-align: center;
  color: rgba(255, 255, 255, 0.4);
  margin: 20px 0 20px;
  font-size: 3vh;
`;

export const ButtonsList = styled.ul`
  display: flex;
  justify-content: center;
`;

export const ButtonBox = styled.li`
  width: calc(min(11vh, 200px));
  height: calc(min(12vh, 200px));
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #ff4400;
  /* Border-selected color #ff9203 */
  border-radius: 4px;
  transition: all 500ms;

  & + li {
    margin-left: 8px;
  }

  &:hover {
    border-right-color: #a10500;
    border-bottom-color: #a10500;

    button {
      color: #ff4400;
    }
  }

  button {
    color: white;
    width: 100%;
    height: 100%;
    transition: all 100ms;
  }
`;
