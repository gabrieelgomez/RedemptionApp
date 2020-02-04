import React, { Component } from 'react';
import {
  Text, View, StyleSheet, ImageBackground,
  Modal, Alert, Fragment, TouchableHighlight, Picker
} from 'react-native';
import ModalSelector from 'react-native-modal-selector'
import Button from '../../components/common/Button';
import * as Icon from "@expo/vector-icons"
import * as api from '../../services/api';
import GetCountryFromIP from '../../lib/getCountryFromIp'
import axios from 'axios';
import { ENDPOINT } from '../../config/appConfig';
import deviceStorage from '../../services/deviceStorage';
import { t } from '../../services/i18n';
import Loading from '../../components/common/Loading';
import Input from '../../components/common/Input';
import TextLink from '../../components/common/TextLink';
import AuthBackground from '../../assets/images/app_background.jpg';

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      error: '',
      loading: true,
      forgotPasswordModalVisible: false,
      forgotUsername: '',
      countryCode: '',
    };
  }

  componentDidMount() {
    this.getCountryCode();
  }

  onLoginFail(error) {
    this.setState({
      error,
      loading: false
    });
  }

  getCountryCode() {
    GetCountryFromIP.getCountryCode()
      .then((response) => {
        console.log("GOT BACK FROM GETCOUNTRYFROMIP: ", response)
        console.log(response.data.location.calling_code)
        const { calling_code } = response.data.location;
          this.setState({
            countryCode: calling_code,
            loading: false
          });
      });
  }

  toggleLoader = (val) => {
    this.setState({
      loading: val
    });
  }

  loginUser = () => {
    const { username, password, countryCode } = this.state;
    const { newAuthToken, setCurrentUser } = this.props.screenProps;
    const headers = {
      'content-type': 'application/json',
      'accept': 'application/json',
    };
    this.toggleLoader(true);
    axios({
      method: 'POST',
      url: `${ENDPOINT}/login`,
      headers: headers,
      data: { user: {
        username: countryCode + username,
        password: password,
        }
      },
    })
      .then((response) => {
        console.log(response.data)
        console.log(response.headers)
        if (response.data.error) {
          console.log("ERROR: ");
          console.log(response.data.error);
          Alert.alert(
            'Error',
            `Invalid Login`,
            [
              { text: 'OK', onPress: () => console.log('OK Pressed') },
            ],
            { cancelable: false }
          );
        } else {
          const { id, attributes } = response.data.data;
          const { authorization } = response.headers
          deviceStorage.saveKey('authToken', authorization);
          deviceStorage.saveKey('currentUser', JSON.stringify(response.data.data));
          console.log(id, '<== Id being saved');
          // console.log(response.data.data, '<== Data being saved');
          deviceStorage.saveKey('api_user_id', id.toString());
          newAuthToken(authorization);
          setCurrentUser(response.data.data)
          // this.setPusherData();
        }
        this.toggleLoader(false);
      })
      .catch((error) => {
        this.toggleLoader(false);
        console.log(error, '<== Error being returned');
        if (error.response && error.response.data) {
          this.onLoginFail(error.response.data.error);
        } else {
          this.onLoginFail(error);
        }
      });
  }

  forgotPassword = () => {
    this.toggleModal();
  }

  toggleModal = () => {
    this.setState({
      forgotPasswordModalVisible: !this.state.forgotPasswordModalVisible,
    });
  }

  fireForgotPassword = (userEmail) => {
    console.log('fire forgotPassword ' + this.state.forgotUsername);
    const headers = {
      'content-type': 'application/json',
      'accept': 'application/json',
    };
    axios({
      method: 'POST',
      url: `${ENDPOINT}/password_reset`,
      headers: headers,
      data: {
        user_email: userEmail,
      },
    })
      .then((response) => {
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error, '<== Error being returned');
        if (error.response && error.response.data) {
          this.onLoginFail(error.response.data.error);
        } else {
          this.onLoginFail(error);
        }
      });
    this.setState({
      forgotUsername: '',
    });
    this.toggleModal();
  }

  renderForgotPasswordModal() {
    const {
      username, password, error, loading, forgotPasswordModalVisible, forgotUsername, countryCode
    } = this.state;
    const {
      container, form, section, errorTextStyle,
      inputContainer, titleText, buttonContainer,
      modalContainer, closeModalButton, modalButtonContainer,
      modalInputContainer, modalTitleText,
    } = styles;
    return (
      <Modal
        animationType="fade"
        transparent
        visible={forgotPasswordModalVisible}
      >
        <View style={modalContainer}>

          <View style={closeModalButton}>
            <Icon.Ionicons
              name="ios-close"
              size={44}
              color="black"
              onPress={() => this.toggleModal()}
              iconStyle={{ marginLeft: 10 }}
            />
          </View>
          <Text style={modalTitleText}>Enviaremos un enlace de recuperación de contraseña a su correo electrónico</Text>
          <View style={modalInputContainer}>
            <Input
              placeholder={t('Phone')}
              value={forgotUsername}
              onChangeText={text => this.setState({ forgotUsername: text })}
            />
          </View>
          <View style={modalButtonContainer}>
            <Button
              onPress={() => this.fireForgotPassword(forgotUsername)}
            >
              Recuperar
            </Button>
          </View>
        </View>
      </Modal>
    )
  }

  handleCountryChange(countryCode) {
    this.setState({ countryCode })
  }

  render() {
    const {
      username, password, error, loading, forgotPasswordModalVisible, forgotUsername, countryCode
    } = this.state;
    const {
      container, form, section, errorTextStyle,
      inputContainer, titleText, buttonContainer,
      modalContainer, closeModalButton, modalButtonContainer,
      modalInputContainer, modalTitleText,
    } = styles;
    const { navigation } = this.props;
    return (
      <View style={container}>
        {this.renderForgotPasswordModal()}
        <ImageBackground source={AuthBackground} style={{ flex: 1, resizeMode: 'cover', paddingBottom: 30 }}>
          <View style={{ height: 50 }} />
          <View style={form}>
            <View style={{ paddingTop: 10 }}>
              <Text style={titleText}>{t('Log In')}</Text>
              <View style={section}>
                <View style={inputContainer}>
                  <Input
                    value={countryCode}
                    onChangeText={text => this.setState({ countryCode: text })}
                  />
                </View>
              </View>

                <Picker
                  selectedValue={countryCode}
                  //style={{ height: 50, width: 100 }}
                  mode="dialog"
                  onValueChange={(itemValue, itemIndex) => this.setState({ countryCode: itemValue })}
                >
                  <Picker.Item label="Peru" value="51" />
                  <Picker.Item label="Bahamas" value="40" />
                  <Picker.Item label="USA" value="1" />
                </Picker>

              <View style={section}>
                <View style={inputContainer}>
                  <Input
                    placeholder={t('Phone')}
                    value={username}
                    onChangeText={text => this.setState({ username: text })}
                  />
                </View>
              </View>
              <View style={section}>
                <View style={inputContainer}>
                  <Input
                    secureTextEntry
                    placeholder={t('Password')}
                    value={password}
                    onChangeText={text => this.setState({ password: text })}
                  />
                </View>
              </View>
            </View>
          </View>
          <TextLink style={{ }} onPress={() => navigation.replace('Registration')}>
            {t('Auth:not_registered_yet')}
          </TextLink>
          <TextLink style={{ }} onPress={() => this.forgotPassword()}>
            {t('Auth:forgot_password')}
          </TextLink>
          <Text style={errorTextStyle}>
            {error}
          </Text>

          {!loading ? (
            <View style={buttonContainer}>
              <Button
                onPress={this.loginUser}
              >
                {t('Log In')}
              </Button>
            </View>
          )
            : <Loading size="large" position="upper" />}
        </ImageBackground>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  form: {
    paddingBottom: 20,
  },
  section: {
    flexDirection: 'row',
    backgroundColor: '#eee',
    borderRadius: 3,
    marginTop: 10,
    height: 40,
    marginLeft: '10%',
    marginRight: '10%',
  },
  titleText: {
    color: '#fff',
    alignSelf: 'center',
    fontSize: 20,
    fontFamily: 'gilroy',
    marginBottom: 10,
  },
  errorTextStyle: {
    alignSelf: 'center',
    fontSize: 18,
    fontFamily: 'gilroy',
    color: 'red',
  },
  iconContainer: {
    flex: 0.1,
    height: 40,
    borderRadius: 3,
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: 'orange',
  },
  inputContainer: {
    flex: 1,
    alignSelf: 'flex-start',
    marginLeft: -70,
  },
  buttonContainer: {
    flex: 1,
    alignSelf: 'center',
  },
  modalContainer: {
    presentationStyle: 'formSheet',
    backgroundColor: '#eee',
    flex: 0.5,
    marginTop: '30%',
    marginLeft: '10%',
    marginRight: '10%',
    justifyContent: 'flex-start',
    borderRadius: 10,
  },
  modalTitleText: {
    color: 'black',
    alignSelf: 'center',
    fontSize: 14,
    fontFamily: 'gilroy',
    marginTop: 10,
  },
  modalInputContainer: {
    // flex: 1,
    height: 60,
    // backgroundColor: '#bbb',
  },
  modalButtonContainer: {
    alignSelf: 'center',
  },
  closeModalButton: {
    width: 44,
    height: 44,
    borderRadius: 0,
    justifyContent: 'flex-start',
    marginTop: -20,
    alignItems: 'flex-end',
    alignSelf: 'flex-end',
  },
};
