import React from 'react';
import {
  Platform, StatusBar, StyleSheet, View, AsyncStorage, YellowBox, I18nManager as RNI18nManager,
} from 'react-native';
import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import * as Icon from '@expo/vector-icons';
import i18n from './services/i18n';
import LoggedInApp from './LoggedInApp';
import AuthNavigator from './navigation/AuthNavigator';
import Loading from './components/common/Loading';
import deviceStorage from './services/deviceStorage';
import GilroyFont from './assets/fonts/Gilroy/Gilroy-Regular.otf';
import GilroyExtraBoldFont from './assets/fonts/Gilroy/Gilroy-Extrabold.otf';
import GilroySemiBoldFont from './assets/fonts/Gilroy/Gilroy-Semibold.otf';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoadingComplete: false,
      authToken: '',
      currentUser: [],
      loading: false,
      isI18nInitialized: false,
    };
    this.newAuthToken = this.newAuthToken.bind(this);
    this.setCurrentUser = this.setCurrentUser.bind(this);
    this.logoutAuthToken = this.logoutAuthToken.bind(this);
    this.loadAuthToken = deviceStorage.loadAuthToken.bind(this);
    this.loadCurrentUser = deviceStorage.loadCurrentUser.bind(this);
    this.deleteAuthToken = deviceStorage.deleteAuthToken.bind(this);
    this.loadAuthToken();
    this.loadCurrentUser();
    this.printDeviceStorageKeys();
    YellowBox.ignoreWarnings(['Warning: ListView is deprecated']);
    // this.deleteAuthToken();
  }

  componentDidMount() {
    i18n.init()
      .then(() => {
        this.setState({ isI18nInitialized: true });
      })
      .catch(error => console.warn(error));
  }

  setCurrentUser(currentUser) {
    this.setState({
      currentUser,
    });
  }

  _handleLoadingError = (error) => {
    // In this case, you might want to report the error to your error
    // reporting service(error)r)r) example Sentry
    console.warn(error);
  };

  _loadResourcesAsync = async () => Promise.all([
    Asset.loadAsync([
      require('./assets/images/art_fan.png'),
      require('./assets/images/art_star.png'),
      require('./assets/images/app_background.jpg'),
      require('./assets/images/circle_pause.png'),
      require('./assets/images/circle_play.png'),
      require('./assets/images/close_button.png'),
      require('./assets/images/play_button.png'),
      require('./assets/images/header_logo.png'),
      require('./assets/images/logo.png'),
      require('./assets/images/predicas.jpg'),
      require('./assets/images/cursos.jpg'),
      require('./assets/images/loading_video.gif'),
    ]),
    Font.loadAsync({
      ...Icon.Ionicons.font,
      ...Icon.FontAwesome.font,
      ...Icon.Feather.font,
      gilroy: GilroyFont,
      gilroySemiBold: GilroySemiBoldFont,
      gilroyExtraBold: GilroyExtraBoldFont,
    }),
  ]);

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };

  printDeviceStorageKeys() {
    console.log('PRINT DEVICE STORAGE KEY / VALUES');
    AsyncStorage.getAllKeys((err, keys) => {
      AsyncStorage.multiGet(keys, (error, stores) => {
        stores.map((result, i, store) => {
          console.log({ [store[i][0]]: store[i][1] });
          return true;
        });
      });
    });
  }

  newAuthToken(authToken) {
    this.setState({
      authToken,
    });
  }

  logoutAuthToken() {
    this.setState({
      authToken: '',
    });
  }

  render() {
    const {
      isLoadingComplete,
      loading,
      authToken,
      currentUser,
      isI18nInitialized,
    } = this.state;
    const { skipLoadingScreen } = this.props;
    if (!isLoadingComplete && !skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    }
    if (loading || !isI18nInitialized) {
      return (
        <Loading size="large" />
      );
    }
    if (!authToken) {
      console.log('<=== NO AUTHTOKEN');
      return (
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <AuthNavigator screenProps={{
            newAuthToken: this.newAuthToken,
            setCurrentUser: this.setCurrentUser,
            currentUser,
          }}
          />
        </View>
      );
    }
    console.log('<=== YES AUTHTOKEN');
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        <LoggedInApp screenProps={{
          logoutAuthToken: this.deleteAuthToken,
          setCurrentUser: this.setCurrentUser,
          currentUser,
        }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
