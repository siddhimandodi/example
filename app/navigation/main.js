import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Icon from '../components/Icon';
/* Stack Screen */
import Player from '../screens/Player';

/* Bottom Screen */
import Blank from '../screens/Blank';
import Favourites from '../screens/Favourites';
import Search from '../screens/Search';

const MainStack = createStackNavigator();
const BottomTab = createBottomTabNavigator();

export default function Main() {
  return (
    <MainStack.Navigator
      headerMode="none"
      initialRouteName="BottomTabNavigator">
      <MainStack.Screen
        name="BottomTabNavigator"
        component={BottomTabNavigator}
      />
      <MainStack.Screen name="Player" component={Player} />
    </MainStack.Navigator>
  );
}

function BottomTabNavigator() {
  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      headerMode="none"
      tabBarOptions={{
        showIcon: true,
        showLabel: true,
        activeTintColor: '#fff',
        inactiveTintColor: '#C2C2C2',
        style: {backgroundColor: '#151515'},
      }}>
      <BottomTab.Screen
        name="Home"
        component={Blank}
        options={{
          title: 'Home',
          tabBarIcon: ({color}) => {
            return <Icon color={color} name="home" size={20} solid />;
          },
        }}
      />

      <BottomTab.Screen
        name="Favourites"
        component={Favourites}
        options={{
          title: 'Favourites',
          tabBarIcon: ({color}) => {
            return <Icon solid color={color} name="heart" size={20} />;
          },
        }}
      />
      <BottomTab.Screen
        name="Search"
        component={Search}
        options={{
          title: 'Search',
          tabBarIcon: ({color}) => {
            return <Icon solid color={color} name="search" size={20} />;
          },
        }}
      />
      <BottomTab.Screen
        name="Accounts"
        component={Blank}
        options={{
          title: 'Accounts',
          tabBarIcon: ({color}) => {
            return <Icon solid color={color} name="user" size={20} />;
          },
        }}
      />
    </BottomTab.Navigator>
  );
}
