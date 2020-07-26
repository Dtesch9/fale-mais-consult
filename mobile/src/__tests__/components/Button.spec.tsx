import React from 'react';
import { render } from 'react-native-testing-library';

import Button from '../../components/Button';

describe('Button Component', () => {
  it('should be able to render button component', () => {
    const { getByText } = render(<Button loading={false}>Button test</Button>);

    expect(getByText('Button test')).toBeTruthy();
  });

  it('should be able to render loading component when loading props true', () => {
    const { getByTestId } = render(<Button loading>Button test</Button>);

    expect(getByTestId('loading-component')).toBeTruthy();
  });
});
