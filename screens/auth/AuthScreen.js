import React from 'react';
import {
  View, Text, Image, ImageBackground,
} from 'react-native';
import { withNavigation, NavigationActions } from 'react-navigation';
import { t } from '../../services/i18n';
import AuthButton from '../../components/common/AuthButton';
import AuthBackground from '../../assets/images/app_background.jpg';
import LogoImage from '../../assets/images/header_logo.png';
import Constants from 'expo-constants';

class AuthScreen extends React.Component {
  static navigationOptions = {
    headerStyle: {
      height: 0,
    },
  };

  render() {
    const { navigation } = this.props;
    // console.log(Constants.manifest.extra.absVersion)
    const version = Constants.manifest.extra ? Constants.manifest.extra.absVersion : '';
    return (
      <View style={styles.container}>
        <ImageBackground
          style={styles.backgroundImage}
          imageStyle={{resizeMode: 'stretch'}}
          source={AuthBackground}
        >
          <Image
            source={LogoImage}
            style={styles.logo}
          />
          <Text style={styles.sloganStyle}>
            Slogan
          </Text>
          <AuthButton
            onPress={() => navigation.navigate('Login')}
          >
            { t('Log In') }
          </AuthButton>
          <AuthButton
            onPress={() => navigation.navigate('Registration')}
          >
            { t('Sign Up') }
          </AuthButton>
          <View style={styles.versionContainer}>
            <Text style={styles.versionStyle}>
              {`v. ${version}`}
            </Text>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

export default withNavigation(AuthScreen);

const styles = {
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  logo: {
    marginTop: 50,
    width: '50%',
    resizeMode: 'contain',
  },
  sloganStyle: {
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'gilroy',
    fontWeight: '500',
    color: 'white',
    width: '85%',
    marginBottom: 40,
    marginTop: 20,
  },
  versionContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  versionStyle: {
    fontSize: 10,
    fontFamily: 'gilroy',
    marginBottom: 20,
  },
};
