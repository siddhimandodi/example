import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Main from './main';
const RootStack = createStackNavigator();

export default function Navigator() {
  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="Main">
        <RootStack.Screen
          options={{headerShown: false}}
          name="Main"
          component={Main}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
