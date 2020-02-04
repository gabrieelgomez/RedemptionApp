import React from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  Alert,
  Picker,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  Animated,
  Dimensions,
  TouchableHighlight,
  ActivityIndicator,
} from 'react-native';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { withNavigation } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ENDPOINT } from '../config/appConfig';
import * as api from '../services/api';
import deviceStorage from '../services/deviceStorage';
import { BackButton } from '../components/common';
import EditInput from '../components/common/EditInput';
import Button from '../components/common/Button';
import Loading from '../components/common/Loading';
import Header from '../components/Header';

const { width: WindowWidth } = Dimensions.get('window');

class EditProfileScreen extends React.Component {
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
      email: '',
      emailInvalid: false,
      username: '',
      phone: '',
      password: '',
      name: '',
      error: '',
      ruc: '',
      address: '',
      district: '',
      image: '',
      uploading: false,
      modalIsVisible: false,
      modalAnimatedValue: new Animated.Value(0),
    };
  }

  componentDidMount() {
    const { currentUser } = this.props.screenProps;
    console.log(currentUser, '<-- currentUser');
    this.setState({
      email: currentUser.attributes.email,
      phone: currentUser.attributes.phone,
      name: currentUser.attributes.name,
      // address: currentUser.address || '',
      district: currentUser.attributes.district || '',
      // image: response.data.data.attributes.image,
      loading: false
    });
  }

  logout() {
    const { screenProps } = this.props;
    screenProps.logoutAuthToken();
  }


  saveEdits() {
    const { setCurrentUser } = this.props.screenProps;
    console.log(this.props.screenProps, '<== PASSED SCREEN PROPS');
    const { navigation } = this.props;
    if (this.state.emailInvalid) {
      return
    }

    this.setState({
      loading: true
    });
    api.post(
      '/edit_user',
      { user: {
        name: this.state.name,
        phone: this.state.phone,
        email: this.state.email,
        username: this.state.username,
        address: this.state.address,
        district: this.state.district,
        ruc: this.state.ruc,
        password: this.state.password,
      } }
    )
    .then((response) => {
      //console.log(response.data.data);
      deviceStorage.saveKey('currentUser', JSON.stringify(response.data.data));
      setCurrentUser(response.data.data)
      navigation.goBack();
    }).catch((error) => {
      console.log(error);
      this.setState({
        error: 'Error modificando perfil',
        loading: false
      });
    });
  }

  maybeRenderModal = () => {
    if (!this.state.modalIsVisible) {
      return null;
    }

    const { modalAnimatedValue } = this.state;
    const opacity = 0;
    const translateY = modalAnimatedValue.interpolate({
      inputRange: [0, 1.5],
      outputRange: [300, -100],
    });

    return (
      <View
        //style={StyleSheet.absoluteFill}
        style={{ zIndex: 999 }}
        pointerEvents={this.state.modalIsVisible ? 'auto' : 'none'}
      >
        <TouchableWithoutFeedback onPress={this.handlePressDone}>
          <Animated.View style={[styles.overlay, { opacity }]} />
        </TouchableWithoutFeedback>
        <Animated.View
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            transform: [{ translateY }],
          }}
        >
          <View style={styles.toolbar}>
            <View style={styles.toolbarRight}>
              <Button onPress={this.handlePressSaveAndDone} >
              OK
              </Button>
            </View>
          </View>
          <Picker
            style={{ width: WindowWidth, backgroundColor: '#e1e1e1' }}
            selectedValue={this.state.district}
            onValueChange={itemValue => this.setState({ district: itemValue })}
          >
          <Picker.Item label='Ancón' value='Ancón' />
          <Picker.Item label='Ate' value='Ate' />
          <Picker.Item label='Barranco' value='Barranco' />
          <Picker.Item label='Breña' value='Breña' />
          <Picker.Item label='Carabayllo' value='Carabayllo' />
          <Picker.Item label='Chaclacayo' value='Chaclacayo' />
          <Picker.Item label='Chorrillos' value='Chorrillos' />
          <Picker.Item label='Cieneguilla' value='Cieneguilla' />
          <Picker.Item label='Comas' value='Comas' />
          <Picker.Item label='El Agustino' value='El Agustino' />
          <Picker.Item label='Independencia' value='Independencia' />
          <Picker.Item label='Jesús María' value='Jesús María' />
          <Picker.Item label='La Molina' value='La Molina' />
          <Picker.Item label='La Victoria' value='La Victoria' />
          <Picker.Item label='Lima-Cercado' value='Lima-Cercado' />
          <Picker.Item label='Lurigancho-Chosica' value='Lurigancho-Chosica' />
          <Picker.Item label='Lurín' value='Lurín' />
          <Picker.Item label='Magadalena del Mar' value='Magadalena del Mar' />
          <Picker.Item label='Miraflores' value='Miraflores' />
          <Picker.Item label='Pachacámac' value='Pachacámac' />
          <Picker.Item label='Pucusana' value='Pucusana' />
          <Picker.Item label='Pueblo Libre' value='Pueblo Libre' />
          <Picker.Item label='Puente Piedra' value='Puente Piedra' />
          <Picker.Item label='Punta Hermosa' value='Punta Hermosa' />
          <Picker.Item label='Punta Negra' value='Punta Negra' />
          <Picker.Item label='Rímac' value='Rímac' />
          <Picker.Item label='San Bartolo' value='San Bartolo' />
          <Picker.Item label='San Borja' value='San Borja' />
          <Picker.Item label='San Isidro' value='San Isidro' />
          <Picker.Item label='San Juan de Lurigancho' value='San Juan de Lurigancho' />
          <Picker.Item label='San Juan de Miraflores' value='San Juan de Miraflores' />
          <Picker.Item label='San Luis' value='San Luis' />
          <Picker.Item label='San Martín de Porres' value='San Martín de Porres' />
          <Picker.Item label='San Miguel' value='San Miguel' />
          <Picker.Item label='Santa Anita' value='Santa Anita' />
          <Picker.Item label='Santa María del Mar' value='Santa María del Mar' />
          <Picker.Item label='Santa Rosa' value='Santa Rosa' />
          <Picker.Item label='Santiago de Surco' value='Santiago de Surco' />
          <Picker.Item label='Surquillo' value='Surquillo' />
          <Picker.Item label='Villa el Salvador' value='Villa el Salvador' />
          <Picker.Item label='Villa María del Triunfo' value='Villa María del Triunfo' />
          </Picker>
        </Animated.View>
      </View>
    );
  };

  handlePressSaveAndDone = () => {
    Animated.timing(this.state.modalAnimatedValue, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start(() => {
      this.setState({ modalIsVisible: false });
      this.handleDistrictChange(this.state.district);
    });
  }

  handleDistrictChange(chosenDistrict) {
    this.setState({ district: chosenDistrict });
  }

  handlePressOpen = () => {
    if (Platform.OS === 'android') {
      return;
    }

    if (this.state.modalIsVisible) {
      return;
    }

    this.setState({ modalIsVisible: true }, () => {
      Animated.timing(this.state.modalAnimatedValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  };

  handleAndroidPickerChange(pickedValue) {
    this.setState({ district: pickedValue });
  }

  maybeRenderPicker() {
    if (Platform.OS === 'android') {
      return (
        <Picker
          selectedValue={this.state.district}
          style={styles.intervalInput}
          onValueChange={(itemValue) => this.handleAndroidPickerChange(itemValue)}
          prompt={'Seleccionar Distrito'}
          mode={'dropdown'}
        >
          <Picker.Item label='Ancón' value='Ancón' />
          <Picker.Item label='Ate' value='Ate' />
          <Picker.Item label='Barranco' value='Barranco' />
          <Picker.Item label='Breña' value='Breña' />
          <Picker.Item label='Carabayllo' value='Carabayllo' />
          <Picker.Item label='Chaclacayo' value='Chaclacayo' />
          <Picker.Item label='Chorrillos' value='Chorrillos' />
          <Picker.Item label='Cieneguilla' value='Cieneguilla' />
          <Picker.Item label='Comas' value='Comas' />
          <Picker.Item label='El Agustino' value='El Agustino' />
          <Picker.Item label='Independencia' value='Independencia' />
          <Picker.Item label='Jesús María' value='Jesús María' />
          <Picker.Item label='La Molina' value='La Molina' />
          <Picker.Item label='La Victoria' value='La Victoria' />
          <Picker.Item label='Lima-Cercado' value='Lima-Cercado' />
          <Picker.Item label='Lurigancho-Chosica' value='Lurigancho-Chosica' />
          <Picker.Item label='Lurín' value='Lurín' />
          <Picker.Item label='Magadalena del Mar' value='Magadalena del Mar' />
          <Picker.Item label='Miraflores' value='Miraflores' />
          <Picker.Item label='Pachacámac' value='Pachacámac' />
          <Picker.Item label='Pucusana' value='Pucusana' />
          <Picker.Item label='Pueblo Libre' value='Pueblo Libre' />
          <Picker.Item label='Puente Piedra' value='Puente Piedra' />
          <Picker.Item label='Punta Hermosa' value='Punta Hermosa' />
          <Picker.Item label='Punta Negra' value='Punta Negra' />
          <Picker.Item label='Rímac' value='Rímac' />
          <Picker.Item label='San Bartolo' value='San Bartolo' />
          <Picker.Item label='San Borja' value='San Borja' />
          <Picker.Item label='San Isidro' value='San Isidro' />
          <Picker.Item label='San Juan de Lurigancho' value='San Juan de Lurigancho' />
          <Picker.Item label='San Juan de Miraflores' value='San Juan de Miraflores' />
          <Picker.Item label='San Luis' value='San Luis' />
          <Picker.Item label='San Martín de Porres' value='San Martín de Porres' />
          <Picker.Item label='San Miguel' value='San Miguel' />
          <Picker.Item label='Santa Anita' value='Santa Anita' />
          <Picker.Item label='Santa María del Mar' value='Santa María del Mar' />
          <Picker.Item label='Santa Rosa' value='Santa Rosa' />
          <Picker.Item label='Santiago de Surco' value='Santiago de Surco' />
          <Picker.Item label='Surquillo' value='Surquillo' />
          <Picker.Item label='Villa el Salvador' value='Villa el Salvador' />
          <Picker.Item label='Villa María del Triunfo' value='Villa María del Triunfo' />
        </Picker>
      );
    }
    return (
      <Text
        style={styles.intervalInput}
        onPress={this.handlePressOpen}
      >
        {this.state.district}
      </Text>

    );
  }

  validatePhone(phone) {
    if (phone.length > 9) {
      return
    }
    this.setState({ phone: phone.replace(/[^0-9]/g, '') })
  }

  validateEmail(email) {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
    this.setState({
                  email,
                  emailInvalid: !reg.test(email),
                  error: reg.test(email) ? '' : 'Error en correo',
                  })
  }

  render() {
    const { container,
            errorText,
            contents,
            section,
            errorTextStyle,
           } = styles;
    const { loading, email, emailInvalid, username, phone, name, error, password, ruc, address, district, image } = this.state;
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
          title='Editar Mi Perfil'
          dark
        />
        <KeyboardAwareScrollView keyboardShouldPersistTaps='always'>
          <View style={contents}>
            <View style={section}>
              <EditInput
                label='Nombre'
                value={name}
                onChangeText={name => this.setState({ name })}
                autoCapitalizeProp='words'
              />
            </View>

            <View style={section}>
              <EditInput
                label='Correo'
                value={email}
                onChangeText={email => this.validateEmail(email)}
                autoCapitalizeProp='none'
              />
            </View>

            <View style={section}>
              <EditInput
                label='Teléfono'
                value={phone}
                onChangeText={phone => this.validatePhone(phone)}
                autoCapitalizeProp='none'
                maxLength={9}
                multiline={false}
              />
            </View>

            <View style={section}>
              <Text style={styles.labelStyle}>{'Distrito'}</Text>
              {this.maybeRenderPicker()}
            </View>

            {this.maybeRenderModal()}

            <View style={section}>
              <EditInput
                secureTextEntry
                label='Contraseña'
                value={password}
                onChangeText={password => this.setState({ password })}
                autoCapitalizeProp='none'
              />
            </View>

            <Text style={errorTextStyle}>
              {error}
            </Text>

          </View>

          <View style={styles.buttonContainer}>
            <View style={{ flex: 1 }}>
              <Button
                onPress={() => this.saveEdits()}
                disabled={emailInvalid}
              >
              Grabar
              </Button>
            </View>
          </View>
          <View style={{ height: 300 }} />
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

export default withNavigation(EditProfileScreen);

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
  form: {
    width: '100%',
    borderTopWidth: 1,
    borderColor: '#ddd',
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
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    width: '100%',
    height: 60,
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 5,
    paddingLeft: 5,
    color: '#bbb',
    paddingTop: 10,
  },
  toolbar: {
    backgroundColor: '#f1f1f1',
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
  toolbarRight: {
    alignSelf: 'center',
  },
  intervalInput: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
    color: '#424242',
    fontSize: 16,
    borderRadius: 10,
    shadowOffset: { width: 5, height: 5 },
    shadowColor: 'grey',
    shadowOpacity: 0.2,
  },
  labelStyle: {
    fontSize: 16,
  },
  pickButtonContainer: {
    flex: 0.3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  maybeRenderContainer: {
    borderRadius: 3,
    elevation: 2,
    marginTop: 30,
    shadowColor: 'rgba(0,0,0,1)',
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 4,
      width: 4,
    },
    shadowRadius: 5,
    width: 100,
  },
};
