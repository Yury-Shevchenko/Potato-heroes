import * as React from 'react';
import { Button } from 'react-native';
import BottomTabNavigator from './BottomTabNavigator';
import Settings from '../screens/Settings';
import { Ionicons } from '@expo/vector-icons';

import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

export default function AppNavigator(){
  return (
    <Stack.Navigator
     screenOptions= {({ navigation }) => ({
       headerStyle: {
         backgroundColor: '#3bb5ee',
       },
       headerTintColor: '#fff',
       headerTitleStyle: {
         fontWeight: 'bold',
         fontSize: 20,
       },
       headerRight: () => (
        <Ionicons
          name="md-settings"
          size={32}
          onPress={() => navigation.navigate('Settings')}
          color="#fff"
          style={{marginRight: 10}}
        />
      ),
     })}
    >
      <Stack.Screen name="Root" component={BottomTabNavigator} />
      <Stack.Screen name="Settings" component={Settings} options={({ route }) => ({ title: 'TELL US ABOUT YOU' })} />
    </Stack.Navigator>
  )

}
