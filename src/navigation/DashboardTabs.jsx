import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Platform, StyleSheet } from 'react-native';

import HomeScreen from '../screens/HomeScreen'; // ✅ New Home inside tab
import TradeScreen from '../screens/TradeScreen';
import CardsScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function DashboardTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarStyle: styles.tabBar,
        tabBarIcon: ({ focused }) => {
          let icon;
          if (route.name === 'Home') icon = 'home';
          else if (route.name === 'Trade') icon = 'balance';
          else if (route.name === 'Profile') icon = 'account-circle';

          return <Icon name={icon} size={24} color={focused ? '#2e7d32' : '#B0B0B0'} />;
        },
        tabBarActiveTintColor: '#2e7d32',
        tabBarInactiveTintColor: '#B0B0B0',
        tabBarLabelStyle: { fontSize: 12 },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
      <Tab.Screen name="Trade" component={TradeScreen} />
      <Tab.Screen name="Profile" component={CardsScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    backgroundColor: '#FFFFF0',
    marginHorizontal: 20,
    marginBottom: 25,
    borderRadius: 50,
    height: 60,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
    paddingBottom: Platform.OS === 'ios' ? 20 : 10,
  },
});
