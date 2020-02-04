import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableHighlight,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import TitleText from '../../components/common/TitleText';
// import Registration from '../components/Registration';

export default class ChooseTypeAccountScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fbPressed: false,
      twitterPressed: false,
      instagramPressed: false,
      googlePressed: false,
      emailPressed: false,
    };
  }

  facebookLogin = () => {
    console.log('pressed Facebook Login');
    this.setState({
      fbPressed: true,
    });
    // navigation.navigate('fbLogin')
  }

  twitterLogin = () => {
    console.log('pressed Twitter Login');
    this.setState({
      twitterPressed: true,
    });
    // navigation.navigate('fbLogin')
  }

  instagramLogin = () => {
    console.log('pressed Instagram Login');
    this.setState({
      instagramPressed: true,
    });
    // navigation.navigate('fbLogin')
  }

  googleLogin = () => {
    console.log('pressed Google Login');
    this.setState({
      googlePressed: true,
    });
    // navigation.navigate('fbLogin')
  }

  emailLogin = () => {
    const { navigation } = this.props;
    console.log('pressed Email Login');
    this.setState({
      emailPressed: true,
    });
    navigation.navigate('Registration');
  }

  render() {
    const {
      fbPressed,
      twitterPressed,
      instagramPressed,
      googlePressed,
      emailPressed,
    } = this.state;
    return (
      <ScrollView style={styles.container}>
        <TitleText style={styles.titleText}>
          How do you want to create your account?
        </TitleText>
        <View style={styles.row}>
          <TouchableHighlight
            style={fbPressed ? styles.activeButton : styles.inactiveButton}
            underlayColor="white"
            activeOpacity={0.5}
            onPress={() => this.facebookLogin()}
          >
            <View style={styles.highlight}>
              <FontAwesome name="facebook" size={60} style={styles.iconStyle} />
              <Text style={styles.smallText}>
                Facebook
              </Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            style={twitterPressed ? styles.activeButton : styles.inactiveButton}
            underlayColor="white"
            activeOpacity={0.5}
            onPress={() => this.twitterLogin()}
          >
            <View style={styles.highlight}>
              <FontAwesome name="twitter" size={60} style={styles.iconStyle} />
              <Text style={styles.smallText}>
                Twitter
              </Text>
            </View>
          </TouchableHighlight>
        </View>
        <View style={styles.row}>
          <TouchableHighlight
            style={instagramPressed ? styles.activeButton : styles.inactiveButton}
            underlayColor="white"
            activeOpacity={0.5}
            onPress={() => this.instagramLogin()}
          >
            <View style={styles.highlight}>
              <FontAwesome name="instagram" size={60} style={styles.iconStyle} />
              <Text style={styles.smallText}>
                Instagram
              </Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            style={googlePressed ? styles.activeButton : styles.inactiveButton}
            underlayColor="white"
            activeOpacity={0.5}
            onPress={() => this.googleLogin()}
          >
            <View style={styles.highlight}>
              <FontAwesome name="google" size={60} style={styles.iconStyle} />
              <Text style={styles.smallText}>
                Google
              </Text>
            </View>
          </TouchableHighlight>
        </View>
        <TitleText style={styles.orTitleText}>
          or
        </TitleText>
        <View style={styles.row}>
          <TouchableHighlight
            style={emailPressed ? styles.activeButton : styles.inactiveButton}
            underlayColor="white"
            activeOpacity={0.5}
            onPress={() => this.emailLogin()}
          >
            <View style={styles.highlight}>
              <FontAwesome name="envelope-o" size={60} style={styles.iconStyle} />
              <Text style={styles.smallText}>
                Email
              </Text>
            </View>
          </TouchableHighlight>
        </View>
      </ScrollView>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    alignSelf: 'center',
    width: '80%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  starContainer: {
  },
  userImage: {
    alignSelf: 'center',
  },
  titleText: {
    width: 178,
    marginBottom: 30,
  },
  orTitleText: {
    marginBottom: 20,
    marginTop: 30,
  },
  smallText: {
    alignSelf: 'center',
    fontSize: 15,
    fontFamily: 'gilroy',
    color: '#262659',
    marginTop: 10,
  },
  inactiveButton: {
    paddingBottom: 10,
    paddingTop: 20,
    paddingLeft: 15,
    paddingRight: 15,
  },
  activeButton: {
    borderWidth: 1,
    borderColor: '#262659',
    borderRadius: 5,
    paddingBottom: 10,
    paddingTop: 20,
    paddingLeft: 15,
    paddingRight: 15,
  },
  iconStyle: {
    color: '#262659',
    alignSelf: 'center',
  },
};
