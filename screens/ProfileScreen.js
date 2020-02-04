import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from 'react-native-vector-icons';
import { withNavigation } from 'react-navigation';
import Header from '../components/Header';

class ProfileScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: <Ionicons
      style={{ height: 32 }}
      name='ios-arrow-round-back'
      size={35}
      onPress={() => navigation.goBack()}
    />,
    headerRight: '',
  });

  logout() {
    const { screenProps } = this.props;
    screenProps.logoutAuthToken();
  }

  render() {
    const { navigation, screenProps } = this.props;
    const { currentUser } = screenProps

    return (
      <View style={styles.container}>
        <Header
          title='Mi Perfil'
          dark
        />
        <View style={styles.helpContainer}>
          <View style={styles.profileContainer}>
            <Text>Nombre: {currentUser.attributes.name}</Text>
            <Text>Correo: {currentUser.attributes.email}</Text>
            <Text>Teléfono: {currentUser.attributes.phone}</Text>
            <Text>Distrito: {currentUser.attributes.district}</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('EditProfile')} style={styles.helpLink}>
            <Text style={styles.helpLinkText}>Edit Personal Information</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('ChangeMobileNumber')} style={styles.helpLink}>
            <Text style={styles.helpLinkText}>Change Mobile Number</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('ChangePassword')} style={styles.helpLink}>
            <Text style={styles.helpLinkText}>Change Password</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('FingerprintModule')} style={styles.helpLink}>
            <Text style={styles.helpLinkText}>Manage Face ID / Fingerprint Login</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.logout()} style={styles.helpLink}>
            <Text style={styles.helpLinkText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default withNavigation(ProfileScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    fontFamily: 'gilroy',
    color: '#2e78b7',
  },
  videoContainer: {
    width: 300,
    height: 300,
  },
});
