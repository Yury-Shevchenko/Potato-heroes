import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import GalleryScreen from '../screens/GalleryScreen';
import AchievementsScreen from '../screens/AchievementsScreen';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

import { Button } from 'react-native';

export default function BottomTabNavigator({ navigation, route }) {
  navigation.setOptions({
    headerTitle: getHeaderTitle(route),
   });

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="Studies"
        component={GalleryScreen}
        options={{
          title: 'Gallery',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-grid" />,
        }}
      />
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Taking photo',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-camera" />,
        }}
      />
      <BottomTab.Screen
        name="History"
        component={AchievementsScreen}
        options={{
          title: 'Achievements',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-star" />,
        }}
      />
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'Home':
      return 'WHAT ARE YOU HAVING?';
    case 'Studies':
      return 'SECRET CHAMBER OF FOOD LOGS';
    case 'History':
      return 'ROOM OF A FUTURE HERO';
  }
}
