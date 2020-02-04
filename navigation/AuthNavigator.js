import React from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import AuthScreen from '../screens/auth/AuthScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import SignUpTypeScreen from '../screens/auth/SignUpTypeScreen';
import ChooseTypeAccountScreen from '../screens/starSignUp/ChooseTypeAccountScreen';
import RegistrationScreen from '../screens/starSignUp/RegistrationScreen';
import PhotoCategoryScreen from '../screens/starSignUp/PhotoCategoryScreen';

const AuthNavigator = createStackNavigator(
  {
    Auth: AuthScreen,
    Login: LoginScreen,
    Registration: RegistrationScreen,
  },
  {
    headerBackTitleVisible: false,
    defaultNavigationOptions: {
      headerTintColor: '#707070',
      headerTransparent: true,
      headerStyle: {
        marginRight: 10,
        marginLeft: 10,
        marginTop: 0,
        marginBottom: 0,
        height: 50,
        borderBottomWidth: 0,
        elevation: 0, // required to remove shadow in Android devices
      },
    },
  },
);

export default createAppContainer(AuthNavigator);
