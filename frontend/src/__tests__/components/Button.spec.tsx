import React from 'react';
import { render } from '@testing-library/react';

import Button from '../../components/Button';

describe('Button Component', () => {
  it('should be able to render button component', () => {
    const { getByText } = render(<Button>Button test</Button>);

    expect(getByText('Button test')).toBeTruthy();
  });

  it('should be able to change style when loading', () => {
    const { getByTestId } = render(<Button loading>Button test</Button>);

    expect(getByTestId('button-container')).toHaveStyle('pointer-events: none');
    expect(getByTestId('button-container')).toHaveStyle('cursor: not-allowed');
  });
});
