import React from 'react';

import GlobalStyles from './styles/global';

import Consult from './pages/Consult';

const App: React.FC = () => {
  return (
    <>
      <Consult />
      <GlobalStyles />
    </>
  );
};

export default App;
