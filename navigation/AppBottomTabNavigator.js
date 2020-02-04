import React from 'react';
import { createAppContainer, createBottomTabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome5';
import MyRewardsScreen from '../screens/MyRewardsScreen';
import HomeScreen from '../screens/HomeScreen';
import WalletScreen from '../screens/WalletScreen';
import ProfileScreen from '../screens/ProfileScreen';

const TabNavigator = createBottomTabNavigator({
  MyRewards: {
      screen: MyRewardsScreen,
      navigationOptions: {
          title: 'My Rewards',
          tabBarIcon: ({ tintColor }) => (
              <Icon
                  name='hand-holding-usd'
                  size={17}
                  color={tintColor} />
          )
      }
  },
  Home: {
      screen: HomeScreen,
      navigationOptions: {
          title: 'Explore',
          tabBarIcon: ({ tintColor }) => (
              <Icon
                  name='search'
                  size={17}
                  color={tintColor} />
          )
      }
  },
  Wallet: {
      screen: WalletScreen,
      navigationOptions: {
          title: 'Wallet',
          tabBarIcon: ({ tintColor }) => (
              <Icon
                  name='credit-card'
                  size={17}
                  color={tintColor} />
          )
      }
  },
  Profile: {
      screen: ProfileScreen,
      navigationOptions: {
          title: 'Profile',
          tabBarIcon: ({ tintColor }) => (
              <Icon
                  name='user'
                  size={17}
                  color={tintColor} />
          )
      }
  },
},
{
  tabBarOptions: {
  activeTintColor: '#f8e700',
  inactiveTintColor: '#fff',
  labelStyle: {
    fontSize: 12,
  },
  style: {
    backgroundColor: '#262659',
  },
}
}

);

export default createAppContainer(TabNavigator);
