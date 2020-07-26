import React, { createContext, useState, useContext, useCallback } from 'react';

interface LoadingContextData {
  loading: boolean;
  setIsLoading(): void;
}

const LoadingContext = createContext<LoadingContextData>(
  {} as LoadingContextData,
);

const LoadingProvider: React.FC = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const setIsLoading = useCallback(() => {
    setLoading(state => !state);
  }, []);

  return (
    <LoadingContext.Provider value={{ loading, setIsLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

function useLoading(): LoadingContextData {
  const context = useContext(LoadingContext);

  return context;
}

export { LoadingProvider, useLoading };
