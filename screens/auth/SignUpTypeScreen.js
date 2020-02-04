import React, { Component } from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import FanImage from '../../assets/images/art_fan.png';
import StarImage from '../../assets/images/art_star.png';

class SignUpTypeScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.fanContainer}
          onPress={() => navigation.navigate('ChooseTypeAccount')}
        >
          <Image
            style={styles.userImage}
            source={FanImage}
            width={90}
          />
          <Text style={styles.bigText}>
            I'm a Fan
          </Text>
          <Text style={styles.smallText}>
            Use this if you want to book
          </Text>
          <Text style={styles.smallText}>
            personalized videos from Stars.
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.starContainer}
          onPress={() => navigation.navigate('ChooseTypeAccount')}
        >
          <Image
            style={styles.userImage}
            source={StarImage}
            width={90}
          />
          <Text style={styles.bigText}>
            I'm a Star
          </Text>
          <Text style={styles.smallText}>
            Use this if you want the fans to
          </Text>
          <Text style={styles.smallText}>
            book videos from you.
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default SignUpTypeScreen;

const styles = {
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: '5%',
    paddingBottom: '15%',
  },
  titleText: {
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '500',
    fontFamily: 'gilroy',
    color: '#ff6c58',
    width: 176,
    lineHeight: 25,
  },
  fanContainer: {
    marginTop: 30,
  },
  starContainer: {
  },
  userImage: {
    alignSelf: 'center',
  },
  bigText: {
    alignSelf: 'center',
    marginTop: 5,
    fontSize: 50,
    fontFamily: 'gilroyExtraBold',
    fontWeight: '800',
    color: '#262659',
  },
  smallText: {
    alignSelf: 'center',
    fontSize: 14,
    fontFamily: 'gilroy',
    color: '#999999',
  },
};
