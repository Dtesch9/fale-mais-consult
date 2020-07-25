import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import GlobalStyles from './styles/global';

import Consult from './pages/Consult';

const App: React.FC = () => {
  return (
    <>
      <Consult />
      <GlobalStyles />
      <ToastContainer autoClose={3000} />
    </>
  );
};

export default App;
