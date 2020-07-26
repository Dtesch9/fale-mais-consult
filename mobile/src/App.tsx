import 'react-native-gesture-handler';

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar, SafeAreaView } from 'react-native';

import AppProvider from './hooks';
import Routes from './routes';

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor="#312e38" />

      <AppProvider>
        <SafeAreaView style={{ flex: 1, backgroundColor: '#312e38' }}>
          <Routes />
        </SafeAreaView>
      </AppProvider>
    </NavigationContainer>
  );
};

export default App;
