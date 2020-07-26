import React from 'react';
import { FaSpinner } from 'react-icons/fa';

import { Container } from './styles';

interface LoadingProps {
  size: number;
  color: string;
}

const Loading: React.FC<LoadingProps> = ({ size, color }) => {
  return (
    <Container>
      <FaSpinner data-testid="spinner-icon" size={size} color={color} />
    </Container>
  );
};

export default Loading;
