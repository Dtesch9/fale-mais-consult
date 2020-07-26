import React from 'react';
import { ActivityIndicator } from 'react-native';
import { RectButtonProperties } from 'react-native-gesture-handler';

import { Container, ButtonBorder, ButtonText } from './styles';

interface ButtonProps extends RectButtonProperties {
  loading: boolean;
}

const Button: React.FC<ButtonProps> = ({ children, loading, ...rest }) => (
  <Container enabled={!loading} {...rest} testID="button-container">
    <ButtonBorder>
      {loading ? (
        <ActivityIndicator
          testID="loading-component"
          size={36}
          color="#ff4400"
        />
      ) : (
        <ButtonText>{children}</ButtonText>
      )}
    </ButtonBorder>
  </Container>
);

export default Button;
