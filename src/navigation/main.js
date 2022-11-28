import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {colors} from '../styleguide/color';
import Icon from '../components/Icon';

/* Stack Screen */
import Login from '../screens/Login';
import Details from '../screens/Details';

/* Bottom Screen */
import Blank from '../screens/Blank';

const MainStack = createStackNavigator();
const BottomTab = createBottomTabNavigator();

export default function Main() {
  return (
    <MainStack.Navigator initialRouteName="BottomTabNavigator">
      <MainStack.Screen
        options={{headerShown: false}}
        name="BottomTabNavigator"
        component={BottomTabNavigator}
      />
      <MainStack.Screen
        options={{headerShown: false}}
        name="Details"
        component={Details}
      />
    </MainStack.Navigator>
  );
}

function BottomTabNavigator() {
  return (
    <BottomTab.Navigator
      initialRouteName="Products"
      screenOptions={{
        tabBarActiveTintColor: colors.grey,
        tabBarInactiveTintColor: colors.black,
      }}>
      <BottomTab.Screen
        name="Products"
        component={Login}
        options={{
          title: 'Products',
          headerShown: false,
          tabBarIcon: ({color}) => {
            return <Icon color={color} name="wallet" size={20} solid />;
          },
        }}
      />
      <BottomTab.Screen
        name="LiveChat"
        component={Blank}
        options={{
          title: 'Live Chat',
          headerShown: false,
          tabBarIcon: ({color}) => {
            return <Icon solid color={color} name="rocketchat" size={20} />;
          },
        }}
      />
      <BottomTab.Screen
        name="RakToken"
        component={Blank}
        options={{
          title: 'RAK Token',
          headerShown: false,
          tabBarIcon: ({color}) => {
            return <Icon color={color} name="key" size={20} />;
          },
        }}
      />
      <BottomTab.Screen
        name="Locateus"
        component={Blank}
        options={{
          title: 'Locate us',
          headerShown: false,
          tabBarIcon: ({color}) => {
            return (
              <Icon solid color={color} name="search-location" size={20} />
            );
          },
        }}
      />
    </BottomTab.Navigator>
  );
}
