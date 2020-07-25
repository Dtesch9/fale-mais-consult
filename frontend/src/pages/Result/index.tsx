import React, { useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

// import { Container } from './styles';

interface RouteParams {
  normal_price: number;
  plan: number;
  plan_price: number;
}

const Result: React.FC = () => {
  const resultParams = useLocation<RouteParams>();
  const history = useHistory();

  useEffect(() => {
    if (!resultParams.state) {
      history.push('/');
    }
  }, [resultParams, history]);

  console.log(resultParams.state);

  return <h1>Result</h1>;
};

export default Result;
