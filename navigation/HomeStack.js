import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { Ionicons } from 'react-native-vector-icons';
import { FontAwesome, Feather } from '@expo/vector-icons';
import { createStackNavigator } from 'react-navigation';
import HomeScreen from '../screens/HomeScreen';
import ActivityScreen from '../screens/ActivityScreen';
import ActivityDetailScreen from '../screens/ActivityDetailScreen';
import VendorsScreen from '../screens/VendorsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import FingerprintModuleScreen from '../screens/FingerprintModuleScreen';

import StarProfileScreen from '../screens/home/StarProfileScreen';
import LogoImage from '../assets/images/header_logo.png';
import AppBottomTabNavigator from './AppBottomTabNavigator';

// import Logo from '../assets/images/art_fan.svg';

const HomeStack = createStackNavigator(
  {
    Home: AppBottomTabNavigator,
    Vendors: VendorsScreen,
    Profile: ProfileScreen,
    EditProfile: EditProfileScreen,
    FingerprintModule: FingerprintModuleScreen,
    StarProfile: StarProfileScreen,
    Activity: ActivityScreen,
    ActivityDetail: ActivityDetailScreen,
  },
  {
    initialRouteName: 'Home',
    headerBackTitleVisible: true,
    defaultNavigationOptions: ({ navigation }) => ({
      headerTitle: (
        <Image
          source={LogoImage}
          style={{
            width: '100%',
            height: '100%',
            resizeMode: 'contain',
            alignSelf: 'center',
          }}
        />
      ),
      headerLeft: <Feather
        style={styles.iconMenuStyle}
        name="menu"
        size={35}
        onPress={() => navigation.toggleDrawer()}
        color="#262659"
      />,
      headerRight: <FontAwesome
        style={styles.iconProfileStyle}
        name="user-circle"
        size={35}
        onPress={() => navigation.navigate('Profile')}
        color="#262659"
        regular
      />,
      headerStyle: {
        marginRight: 10,
        marginLeft: 10,
        marginTop: 0,
        marginBottom: 0,
        height: 50,
        borderBottomWidth: 0,
        elevation: 0, // required to remove shadow in Android devices
      },
    }),
  },
);

export default HomeStack;

const styles = StyleSheet.create({
  iconMenuStyle: {
    height: 30,
  },
  iconProfileStyle: {
    height: 32,
  },
});
