import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { FontAwesome, Feather } from '@expo/vector-icons';
import { createStackNavigator } from 'react-navigation';
import PrivacyPolicyScreen from '../screens/PrivacyPolicyScreen';
import LogoImage from '../assets/images/header_logo.png';

const PrivacyPolicyStack = createStackNavigator(
  {
    PrivacyPolicy: PrivacyPolicyScreen,
  },
  {
    initialRouteName: 'PrivacyPolicy',
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

export default PrivacyPolicyStack;

const styles = StyleSheet.create({
  iconMenuStyle: {
    height: 30,
  },
  iconProfileStyle: {
    height: 32,
  },
});
