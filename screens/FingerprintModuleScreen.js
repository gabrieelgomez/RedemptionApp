import React from 'react';
import {
  View,
  Text,
  Image,
  Alert,
  Platform,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { withNavigation } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ENDPOINT } from '../config/appConfig';
import * as api from '../services/api';
import deviceStorage from '../services/deviceStorage';
import Button from '../components/common/Button';
import Loading from '../components/common/Loading';
import Header from '../components/Header';
import { Constantsrr } from 'expo';
import * as LocalAuthentication from 'expo-local-authentication'

class FingerprintModuleScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: <Ionicons
      style={{ height: 32 }}
      name='ios-arrow-round-back'
      size={35}
      onPress={() => navigation.goBack()}
    />,
    headerRight: '',
  });

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      name: '',
      response: '',
      error: '',
      uploading: false,
      compatible: false,
      fingerprints: false,
      responseFingerprint: '',
    };
  }

  componentDidMount() {
    this.checkDeviceForHardware();
    this.checkForFingerprints();
    const { currentUser } = this.props.screenProps;
    console.log(currentUser, '<-- currentUser');
    this.setState({
      email: currentUser.attributes.email,
      phone: currentUser.attributes.phone,
      name: currentUser.attributes.name,
      loading: false
    });
  }

  checkDeviceForHardware = async () => {
    let compatible = await LocalAuthentication.hasHardwareAsync();
    this.setState({ compatible });
  };

  checkForFingerprints = async () => {
    let fingerprints = await LocalAuthentication.isEnrolledAsync();
    this.setState({ fingerprints });
  };

  scanFingerprint = async () => {
    let responseFingerprint = await LocalAuthentication.authenticateAsync({promptMessage: 'Scan your finger.'});
    console.log('Scan Result:', responseFingerprint);
    this.setState({
      responseFingerprint: JSON.stringify(responseFingerprint),
    });
  };

  showAndroidAlert = () => {
    Alert.alert(
      'Fingerprint Scan',
      'Press scan and then place your finger on the touch sensor.',
      [
        {
          text: 'Scan',
          onPress: () => {
            this.scanFingerprint();
          },
        },
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel'),
          style: 'cancel',
        },
      ]
    );
  };


  render() {
    const { container, errorText, contents, section, errorTextStyle } = styles;
    const { loading, response, } = this.state;
    const { navigation, screenProps } = this.props;
    const { currentUser } = screenProps
    if (loading) {
      return (
        <View style={container}>
          <Loading size={'large'} />
        </View>
      );
    }

    return (
      <View style={container}>
        <Header
          title='Face ID / Fingerprint ID'
          dark
        />
        <KeyboardAwareScrollView keyboardShouldPersistTaps='always'>
          <View style={contents}>

            <View style={styles.container}>

              <Text style={styles.text}>
                Compatible Device? {this.state.compatible === true ? 'True' : 'False'}
              </Text>

              <Text style={styles.text}>
                Fingerprings Saved?{' '}
                {this.state.fingerprints === true ? 'True' : 'False'}
              </Text>

              <View style={styles.containerFingerprint}>
                <Image
                  source={require('../assets/images/fingerprint.png')}
                  style={{
                    width: '100%',
                    height: 150,
                    resizeMode: 'center',
                    alignSelf: 'center',
                  }}
                />
              </View>

              <View style={styles.buttonContainer}>
                <View style={{ flex: 1 }}>
                  <Button
                    onPress={
                      Platform.OS === 'android'
                        ? this.showAndroidAlert
                        : this.scanFingerprint
                    }
                  >
                  Scan Fingerprint
                  </Button>
                </View>
              </View>

              <View style={styles.containerFingerprint}>
                <Text>{this.state.responseFingerprint}</Text>
              </View>

            </View>

          </View>

        </KeyboardAwareScrollView>
      </View>
    );
  }
}

export default withNavigation(FingerprintModuleScreen);

const styles = {
  container: {
    flex: 1,
    // alignItems: 'center',
    marginLeft: 20,
    marginRight: 20,
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
  },
  errorText: {
    alignSelf: 'center',
    fontSize: 18,
    color: 'red'
  },
  contents: {
    flex: 0.9,
    justifyContent: 'flex-start',
    marginTop: 10,
  },
  section: {
    flex: 1,
    flexDirection: 'column',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    marginBottom: 10,
  },
  errorTextStyle: {
    alignSelf: 'center',
    fontSize: 18,
    color: 'red'
  },
  containerFingerprint:{
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    marginLeft: 10,
    marginRight: 10,
    width: '100%',
    height: 60,
  },
};
