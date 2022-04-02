import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Main from 'app/navigation/main';
const RootStack = createStackNavigator();

export default function Navigator() {
  

  return (    
      <NavigationContainer>
        <RootStack.Navigator
          mode="modal"
          headerMode="none"
          initialRouteName="Main">
         
          <RootStack.Screen name="Main" component={Main} />
          
        </RootStack.Navigator>
      </NavigationContainer>    
  );
}
