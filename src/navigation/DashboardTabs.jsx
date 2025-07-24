import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Platform, StyleSheet } from 'react-native';

import TabHomeScreen from '../screens/TabHomeScreen'; // ✅ New Home inside tab
import TransactionsScreen from '../screens/TransactionsScreen';
import CardsScreen from '../screens/CardsScreen';

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
          if (route.name === 'TabHome') icon = 'home';
          else if (route.name === 'Transactions') icon = 'account-balance-wallet';
          else if (route.name === 'Profile') icon = 'account-circle';

          return <Icon name={icon} size={24} color={focused ? '#2e7d32' : '#B0B0B0'} />;
        },
        tabBarActiveTintColor: '#2e7d32',
        tabBarInactiveTintColor: '#B0B0B0',
        tabBarLabelStyle: { fontSize: 12 },
      })}
    >
      <Tab.Screen name="TabHome" component={TabHomeScreen} options={{ title: 'Home' }} />
      <Tab.Screen name="Transactions" component={TransactionsScreen} />
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
