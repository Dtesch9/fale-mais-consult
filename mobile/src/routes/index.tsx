import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Consult from '../pages/Consult';

const App = createStackNavigator();

const AppRoutes: React.FC = () => (
  <App.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: '#312e38' },
      gestureEnabled: true,
      gestureDirection: 'horizontal',
    }}
  >
    <App.Screen name="Consult" component={Consult} />
  </App.Navigator>
);

export default AppRoutes;
