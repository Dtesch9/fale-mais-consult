import styled, { css } from 'styled-components/native';

import logo from '../../assets/logo.png';

export const Container = styled.SafeAreaView`
  align-items: center;
`;

export const Logo = styled.Image.attrs({
  source: logo,
})`
  width: 200px;
  height: 200px;
`;

export const Wrapper = styled.View`
  width: 95%;
  align-items: center;
  margin-bottom: 12px;
  height: 100%;
`;

export const Cards = styled.ScrollView`
  max-height: 270px;
  margin-top: 80px;
`;

export const Card = styled.View`
  background: #312e38;
  border-style: solid;
  border-width: 1px;
  border-color: #ff4400;
  border-radius: 6px;
  height: 250px;
  width: 200px;
  margin: 8px;
  justify-content: space-between;
`;

const cardTextCss = css`
  margin-top: 12px;
  text-transform: uppercase;
  font-family: 'RobotoSlab-light';
  text-align: center;
`;

export const CardTextOne = styled.Text`
  ${cardTextCss};
  color: #ff6600;
  font-size: 24px;
`;

export const CardTextTwo = styled.Text`
  ${cardTextCss};
  color: rgba(255, 255, 255, 0.4);
  font-size: 28px;
`;

export const CardTextThree = styled.Text`
  ${cardTextCss};
  color: #ff9000;
  font-size: 32px;
  margin-bottom: 24px;
  border-bottom-width: 1px;
  border-color: #ff7000;
`;
