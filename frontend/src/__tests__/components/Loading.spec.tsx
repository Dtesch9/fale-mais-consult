import React from 'react';
import { render } from '@testing-library/react';

import Loading from '../../components/Loading';

describe('Loading Component', () => {
  it('should be able to render loading component', () => {
    const { getByTestId } = render(<Loading size={20} color="#ff4400" />);

    expect(getByTestId('spinner-icon')).toBeTruthy();
    expect(getByTestId('spinner-icon')).toHaveStyle('font-size: 20');
    expect(getByTestId('spinner-icon')).toHaveStyle('color: #ff4400');
  });
});
