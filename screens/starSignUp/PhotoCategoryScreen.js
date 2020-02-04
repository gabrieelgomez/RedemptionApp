import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import axios from 'axios';
import { ENDPOINT } from '../../config/appConfig';
import deviceStorage from '../../services/deviceStorage';
import HeaderRightButton from '../../components/common/HeaderRightButton';
import CategoryInput from '../../components/common/CategoryInput';
import CircleSteps from '../../components/common/CircleSteps';
import TextLink from '../../components/common/TextLink';
import TitleText from '../../components/common/TitleText';
// import Registration from '../components/Registration';

export default class PhotoCategoryScreen extends Component {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    return {
      headerRight: <HeaderRightButton
        text="Save"
        onPress={navigation.getParam('pressedRightButton')}
      />,
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      picture: '',
      categories: '',
      error: '',
      loading: false,
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    navigation.setParams({ pressedRightButton: this.handleHeaderRightButton });
  }

  handleHeaderRightButton = () => {
    console.log('pressed headerRightButton');
    this.validateFields();
    this.postPictureAndCategories();
  }

  onApiFail(error) {
    this.setState({
      error,
      loading: false,
    });
  }

  validateFields = () => {
    console.log('ran validations');
  }

  postPictureAndCategories() {
    const {
      picture,
      categories,
      error,
      loading,
    } = this.state;
    const { navigation } = this.props;
    const regAuthToken = deviceStorage.loadKey('registration_authentication_token'); // TODO this is async!!
    axios({
      method: 'POST',
      url: `${ENDPOINT}/user/profileimages/`,
      headers: {
        version: '4.4',
        device: 'web',
        Authorization: `token ${regAuthToken}`,
      },
      data: {
        picture,
        categories,
      },
    })
      .then((response) => {
        const { request } = response.data.data;
        navigation.navigate('WelcomeVideo')
      })
      .catch((error) => {
        console.log(JSON.stringify(error.response));
        if (error.response && error.response.data && error.response.data.error) {
          this.onApiFail(error.response.data.error.message);
        } else {
          this.onApiFail(error);
        }
      });
  }

  handlePressBrowseCategories = () => {
    console.log('Pressed Browse Categories')
  }

  handlePressPause = () => {
    console.log('Pressed Pause Registration')
  }

  render() {
    const {
      picture,
      categories,
      loading,
      error,
    } = this.state;
    return (
      <View style={styles.container}>
        <TitleText style={styles.titleText}>
          Your fans are begging for more
        </TitleText>
        <CircleSteps
          step={2}
          totalSteps={3}
        />
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            onPress={() => this.UploadPicture()}
            style={styles.pictureButton}
          >
            <FontAwesome name="upload" size={34} style={styles.iconStyle} />
            <Text
              style={styles.pictureButtonText}
            >
              Upload Profile Picture
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.UploadPicture()}
            style={styles.pictureButton}
          >
            <FontAwesome name="camera" size={34} style={styles.iconStyle} />
            <Text
              style={styles.pictureButtonText}
            >
              Take a Profile Picture
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.section}>
          <CategoryInput
            placeholder="Add a category to describe your profession (up to 3)"
            value={categories}
            onChangeText={categories => this.setState({ categories })}
            autoCapitalizeProp="words"
          />
        </View>
        <View>
          <View style={styles.lateralText}>
            <Text style={styles.findingText}>
              Not finding one?
            </Text>
            <TextLink
              textColor="#262659"
              onPress={() => this.handlePressReferral()}
            >
              Browse Categories
            </TextLink>
          </View>
          <View style={styles.pauseStyle}>
            <TextLink
              textColor="#262659"
              onPress={() => this.handlePressPause()}
            >
              Pause Registration
            </TextLink>
          </View>
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    alignSelf: 'center',
    width: '95%',
  },
  titleText: {
    marginBottom: 20,
  },
  buttonsContainer: {
    width: '90%',
    marginTop: 40,
    marginBottom: 70,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignSelf: 'center',
  },
  pictureButton: {
    backgroundColor: '#eaeaea',
    borderRadius: 90,
    width: 135,
    height: 135,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pictureButtonText: {
    textAlign: 'center',
    marginTop: 5,
  },
  sectionText1: {
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 13,
    fontFamily: 'gilroy',
    color: 'black',
    marginTop: 20,
  },
  findingText: {
    color: 'black',
    marginRight: 8,
    marginTop: 5,
  },
  lateralText: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  iconStyle: {
    color: '#262659',
    alignSelf: 'center',
  },
  pauseStyle: {
    marginTop: 120,
  },
};
