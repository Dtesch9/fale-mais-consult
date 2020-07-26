import React from 'react';
import { View, ActivityIndicator } from 'react-native';

import AppRoutes from './app.routes';

import { useLoading } from '../hooks/loading';

const Routes: React.FC = () => {
  const { loading } = useLoading();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size={70} color="#ff4400" />
      </View>
    );
  }

  return <AppRoutes />;
};

export default Routes;
