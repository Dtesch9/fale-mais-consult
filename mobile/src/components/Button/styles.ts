import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  height: 50px;
  justify-content: center;
  align-items: center;
  margin-top: 8px;
  margin-bottom: 12px;
`;

export const ButtonBorder = styled.View`
  height: 50px;
  width: 100%;
  background: transparent;
  border-style: solid;
  border-width: 2px;
  border-color: #ff6000;
  border-radius: 4px;

  justify-content: center;
  align-items: center;
`;

export const ButtonText = styled.Text`
  font-family: 'RobotoSlab-light';
  color: rgba(255, 255, 255, 0.4);
  font-size: 18px;
`;
