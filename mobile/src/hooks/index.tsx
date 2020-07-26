import React from 'react';

import { LoadingProvider } from './loading';

const AppProvider: React.FC = ({ children }) => (
  <LoadingProvider>{children}</LoadingProvider>
);

export default AppProvider;
