import React from 'react';
import { TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Feather';

import Consult from '../pages/Consult';
import Result from '../pages/Result';

const App = createStackNavigator();

const AppRoutes: React.FC = () => (
  <App.Navigator
    screenOptions={{
      cardStyle: { backgroundColor: '#312e38' },
      headerTitleStyle: { display: 'none' },
      headerTransparent: true,
    }}
  >
    <App.Screen name="Consult" component={Consult} />
    <App.Screen
      name="Result"
      component={Result}
      options={({ navigation }) => ({
        headerLeft: () => (
          <TouchableOpacity
            testID="back-button"
            onPress={() => navigation.goBack()}
          >
            <Icon name="chevron-left" size={30} color="#ff9000" />
          </TouchableOpacity>
        ),
        headerBackTitleVisible: false,
      })}
    />
  </App.Navigator>
);

export default AppRoutes;
