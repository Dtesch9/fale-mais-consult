import React from 'react';
import { SafeAreaView, ScrollView, View, Text, StatusBar } from 'react-native';

const App: React.FC = () => {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <SafeAreaView>
        <ScrollView contentInsetAdjustmentBehavior="automatic" />
      </SafeAreaView>
    </>
  );
};

export default App;
