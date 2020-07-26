import React, { ButtonHTMLAttributes } from 'react';

import Loading from '../Loading';

import { Container } from './styles';

interface Props {
  loading?: boolean;
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & Props;

const Button: React.FC<ButtonProps> = ({ children, loading, ...rest }) => {
  return (
    <Container data-testid="button-container" disabled={loading} {...rest}>
      {loading ? <Loading size={24} color="#ff4400" /> : children}
    </Container>
  );
};

export default Button;
