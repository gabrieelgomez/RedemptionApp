import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  View,
  ImageBackground,
  Button,
} from 'react-native';
import { Video } from 'expo-av';
import { Ionicons } from 'react-native-vector-icons';
import { withNavigation } from 'react-navigation';
import { SearchBar } from 'react-native-elements';
import Loading from '../../components/common/Loading';
import * as api from '../../services/api';
import PlayButton from '../../assets/images/circle_play.png';
import PauseButton from '../../assets/images/circle_pause.png';
import BookFooter from '../../components/Home/BookFooter';

class StarProfileScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: <Ionicons
      style={{ height: 32 }}
      name="ios-arrow-round-back"
      size={35}
      onPress={() => navigation.goBack()}
    />,
    headerRight: '',
  });

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      profiledStar: [],
      videoModal: false,
      videoPlaying: true,
      videoLoading: false,
      error: '',
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    const starId = navigation.getParam('starId', '');
    api.get(
      `/user/user_details/${starId}/`,
    ).then((response) => {
      const newData = response.data.data;
      this.setState({
        profiledStar: newData,
        loading: false,
      });
    }).catch((error) => {
      console.log(error);
      this.setState({
        error: 'Error retrieving data',
        loading: false,
      });
    });
  }

  playVideo = () => {
    this.setState({
      videoModal: true,
    });
  };

  closeVideo = () => {
    this.setState({
      videoModal: false,
      videoPlaying: true,
    });
  };

  toggleVideo = () => {
    const { videoPlaying } = this.state;
    if (videoPlaying) {
      this.playbackInstance.pauseAsync();
      this.setState({
        videoPlaying: false,
      });
    } else {
      this.playbackInstance.playAsync();
      this.setState({
        videoPlaying: true,
      });
    }
  }

  onPressBooking = (starId) => {
    console.log(`Pressed Book Star ${starId}`);
  }

  _onLoadStart = () => {
    console.log(`ON LOAD START`);
    this.setState({
      videoLoading: false,
    });
  };

  _onLoad = status => {
    this.setState({
      videoLoading: false,
    });
    console.log(`ON LOAD : ${JSON.stringify(status)}`);
  };

  render() {
    const { navigation } = this.props;
    const { profiledStar, loading, videoLoading, videoModal, videoPlaying } = this.state;
    if (loading) {
      return (
        <Loading size="large" />
      );
    }
    if (videoLoading) {
      return (
        <Loading size="large" />
      );
    }
    if (videoModal) {
      return (
        <View style={styles.container}>
          <View style={styles.videoContainer}>
            <View style={styles.videoHeaderContainer}>
              <Text style={styles.videoNameText}>
                {profiledStar.nickname
                  ? profiledStar.user.nickname : (`${profiledStar.user.first_name} ${profiledStar.user.last_name}`)
                }
              </Text>
              <View style={styles.videoCloseButtonView}>
                <TouchableHighlight
                  onPress={() => this.closeVideo()}
                >
                  <Image
                    style={styles.videoCloseButton}
                    source={require('../../assets/images/close_button.png')}
                  />
                </TouchableHighlight>
              </View>
            </View>
            <View style={styles.videoBodyContainer}>
              <Video
                style={styles.video}
                source={{ uri: 'https://app.starsona.com/private/video/YQdJ2dOG.mp4?v=2.1' }}
                rate={1.0}
                volume={1.0}
                isMuted={false}
                resizeMode={Video.RESIZE_MODE_CONTAIN}
                shouldPlay
                isLooping={false}
                onLoadStart={this._onLoadStart}
                onLoad={this._onLoad}
                // usePoster
                // posterSource={{ uri: 'https://media.giphy.com/media/cZDRRGVuNMLOo/giphy.gif' }}
                // useNativeControls
                ref={(component) => {
                  this.playbackInstance = component;
                }}
              />
              <TouchableHighlight
                onPress={() => this.toggleVideo()}
              >
                <Image
                  style={styles.videoTogglePlayButton}
                  source={videoPlaying ? PauseButton : PlayButton}
                />
              </TouchableHighlight>
            </View>
          </View>
          <View style={styles.bookContainer}>
            <BookFooter
              onPress={() => this.onPressBooking(profiledStar.user.id)}
              star={profiledStar}
            />
          </View>
        </View>
      )
    }
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.profileContainer}>
            <View style={styles.imageContainer}>
              <ImageBackground
                style={styles.starImage}
                source={{
                  uri: profiledStar.user.avatar_photo.image_url,
                }}
              >
                <View style={styles.playVideoButton}>
                  <TouchableHighlight
                    onPress={() => this.playVideo()}
                  >
                    <Image
                      style={styles.imageButton}
                      source={PlayButton}
                    />
                </TouchableHighlight>
                </View>
              </ImageBackground>
            </View>
            <Text style={styles.nameText}>
              {profiledStar.nickname
                ? profiledStar.user.nickname : (`${profiledStar.user.first_name} ${profiledStar.user.last_name}`)
              }
            </Text>
            <Text style={styles.groupText}>
              {profiledStar.celebrity_details.profession_details[0].title}
            </Text>
            <View style={styles.averagesContainer}>
              <View style={styles.averagesRatingContainer}>
              <Text style={styles.averageRatingText}>
                {`Avg Rating: ${profiledStar.celebrity_details.rating}`}
              </Text>
              </View>
              <View style={styles.averagesResponseContainer}>
              <Text style={styles.averageResponseTitleText}>
                Avg Response Time
              </Text>
              <Text style={styles.averageResponseText}>
                {`${profiledStar.celebrity_details.rating} Days`}
              </Text>
              </View>
            </View>
            <Text style={styles.descriptionText}>
              {profiledStar.celebrity_details.description}
            </Text>
          </View>
        </ScrollView>
        <View style={styles.bookContainer}>
          <BookFooter
            onPress={() => this.onPressBooking(profiledStar.user.id)}
            star={profiledStar}
          />
        </View>
      </View>
    );
  }
}

export default withNavigation(StarProfileScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  imageContainer: {
    alignSelf: 'center',
    height: 200,
    width: 200,
    backgroundColor: '#fff',
    borderWidth: 0,
    borderRadius: 90,
    borderColor: '#fff',
    overflow: 'hidden',
    marginBottom: 5,
  },
  starImage: {
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'transparent',
  },
  nameText: {
    alignSelf: 'center',
    fontSize: 26,
    fontFamily: 'gilroy',
    marginTop: 5,
    color: '#615195',
  },
  groupText: {
    alignSelf: 'center',
    fontSize: 12,
    fontFamily: 'gilroy',
    marginTop: 0,
    color: '#615195',
  },
  averagesContainer: {
    marginTop: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  averagesRatingContainer: {

  },
  averagesResponseContainer: {

  },
  descriptionText: {
    padding: 15,
    fontSize: 12,
    fontFamily: 'gilroy',
    color: 'grey',
  },
  playVideoButton: {
    marginTop: 135,
  },
  imageButton: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    padding: 10,
  },
  videoContainer: {
    flex: 1,
    marginLeft: 15,
    marginRight: 15,
    paddingBottom: 10,
  },
  videoHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 20,
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 15,
  },
  videoBodyContainer: {
    flex: 1,
  },
  video: {
    flex: 1,
    borderRadius: 20,
    overflow: 'hidden',
  },
  videoNameText: {
    fontSize: 26,
    fontFamily: 'gilroy',
    color: '#615195',
  },
  videoCloseButtonView: {
    paddingTop: 7,
  },
  videoCloseButton: {
    backgroundColor: 'transparent',
    width: 25,
    height: 25,
  },
  videoTogglePlayButton: {
    alignSelf: 'center',
    backgroundColor: 'transparent',
    marginTop: -80,
    width: 65,
    height: 65,
  },
  bookContainer: {
    backgroundColor: '#262659',
    height: 60,
  },
});
