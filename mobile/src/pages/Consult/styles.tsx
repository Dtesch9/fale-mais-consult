import styled, { css } from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

import logo from '../../assets/logo.png';

interface ButtonBoxProps {
  isFirst: number;
}

export const Container = styled.View`
  flex-direction: column;
  align-items: center;
`;

export const Wrapper = styled.View`
  width: 95%;
  align-items: center;
  margin-bottom: 12px;
`;

export const Logo = styled.Image.attrs({
  source: logo,
})`
  width: 200px;
  height: 200px;
`;

export const Form = styled.View`
  width: 100%;
  align-items: center;
`;

const originDestinationPlanTextCss = css`
  margin-bottom: 18px;
  margin-top: 18px;
  color: rgba(255, 255, 255, 0.4);
  font-size: 20px;
  font-family: 'RobotoSlab-Light';
`;

const originDestinationPlanContainerCss = css`
  max-width: 100%;
`;

export const OriginContainer = styled.View`
  ${originDestinationPlanContainerCss};
`;

export const OriginText = styled.Text`
  ${originDestinationPlanTextCss};
`;

export const DestinationContainer = styled.View`
  ${originDestinationPlanContainerCss};
`;

export const DestinationText = styled.Text`
  ${originDestinationPlanTextCss};
  text-align: right;
`;

export const PlanContainer = styled.View`
  ${originDestinationPlanContainerCss};
`;

export const PlanText = styled.Text`
  ${originDestinationPlanTextCss};
  text-align: center;
`;

export const ButtonsList = styled.View`
  flex-direction: row;
  justify-content: center;
`;

export const ButtonBox = styled.View<ButtonBoxProps>`
  width: 85px;
  height: 85px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border-width: 2px;
  border-style: solid;
  border-color: #ff4400;
  border-radius: 4px;

  margin-left: ${({ isFirst }) => isFirst && '8px'};
`;

export const CustomRectButton = styled(RectButton).attrs({
  rippleColor: '#ff7700',
})`
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  border-radius: 4px;
`;

export const ButtonText = styled.Text`
  color: #ff4400;
`;
