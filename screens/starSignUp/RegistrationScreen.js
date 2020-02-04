import React, { Component } from 'react';
import {
  Text, View, StyleSheet, ImageBackground,
  Modal, Alert, Fragment,
} from 'react-native';
import Button from '../../components/common/Button';
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
      name: '',
      email: '',
      phone: '',
      password: '',
      error: '',
      loading: false,
    };
  }

  onRegistrationFail(error) {
    let apiError = '';
    const myErrorObject = error.data[0].error;
    // console.log(myErrorObject)

    Object.keys(myErrorObject).forEach((key) => {
      // console.log(key);
      // console.log(myErrorObject[key])
      apiError += `${key} ${myErrorObject[key]}. `;
    });

    this.setState({
      error: apiError,
      loading: false,
    });
  }

  validateFields = () => {
    console.log('ran validations');
  }

  registerUser = () => {
    this.validateFields();
    const {
      name,
      email,
      phone,
      password
    } = this.state;
    const { newAuthToken, setCurrentUser } = this.props.screenProps;
    const headers = {
      'content-type': 'application/json',
      'accept': 'application/json',
    };
    this.setState({
      loading: true
    });
    axios({
      method: 'POST',
      url: `${ENDPOINT}/signup`,
      headers: headers,
      data: { user: {
        email: email,
        name: name,
        phone: phone,
        password: password,
        password_confirmation: password,
        }
      },
    })
      .then((response) => {
        console.log(response.data)
        console.log(response.headers)
        const { id, attributes } = response.data.data;
        const { authorization } = response.headers
        deviceStorage.saveKey('authToken', authorization);
        console.log(id, '<== Id being saved');
        deviceStorage.saveKey('api_user_id', id.toString());
        deviceStorage.saveKey('api_user_email', attributes.email);
        deviceStorage.saveKey('currentUser', JSON.stringify(response.data.data));
        newAuthToken(authorization);
        setCurrentUser(response.data.data)
        // this.setPusherData();
      })
      .catch((error) => {
        console.log(error, '<== Error being returned');
        if (error.response && error.response.data) {
          this.onRegistrationFail(error.response.data);
        } else {
          this.onRegistrationFail(error);
        }
      });
  }

  render() {
    const {
      name, email, phone, password, error, loading,
    } = this.state;
    const {
      container, form, section, errorTextStyle,
      inputContainer, titleText, buttonContainer,
    } = styles;
    const { navigation } = this.props
    return (
      <View style={container}>
        <ImageBackground source={AuthBackground} style={{ flex: 1, resizeMode: 'cover', paddingBottom: 30 }}>
          <View style={{ height: 50 }} />
          <View style={form}>
            <View style={{ paddingTop: 10 }}>
              <Text style={titleText}>{t('Sign Up')}</Text>
              <View style={section}>
                <View style={inputContainer}>
                  <Input
                    placeholder={t('Name')}
                    value={name}
                    onChangeText={text => this.setState({ name: text })}
                  />
                </View>
              </View>
              <View style={section}>
                <View style={inputContainer}>
                  <Input
                    placeholder={t('Email')}
                    value={email}
                    onChangeText={text => this.setState({ email: text })}
                  />
                </View>
              </View>
              <View style={section}>
                <View style={inputContainer}>
                  <Input
                    placeholder={t('Phone')}
                    value={phone}
                    onChangeText={text => this.setState({ phone: text })}
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
          <TextLink style={{ }} onPress={() => navigation.replace('Login')}>
            {t('Auth:already_registered')}
          </TextLink>
          <Text style={errorTextStyle}>
            {error}
          </Text>

          {!loading ? (
            <View style={buttonContainer}>
              <Button
                onPress={this.registerUser}
              >
                {t('Sign Up')}
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
    paddingLeft: 20,
    paddingRight: 20,
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
};
