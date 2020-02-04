import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  CameraRoll,
} from 'react-native';
import { Video } from 'expo-av'
import { Ionicons } from 'react-native-vector-icons';
import { withNavigation } from 'react-navigation';
import Button from '../components/common/Button';
import deviceStorage from '../services/deviceStorage';
import Loading from '../components/common/Loading';
import * as api from '../services/api';

class IndCursoScreen extends React.Component {
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
      course: [],
      categories: [],
      typingTimeout: 0,
      error: '',
    };
  }

  componentDidMount() {
    this.getSerieChapter();
  }

  getSerieChapter() {
    const { screenProps, navigation } = this.props;
    const { activeCategory, menuCategoryItems, currentUser } = screenProps;
    const categoryId = this.getCategoryDescription(activeCategory, menuCategoryItems);
    const courseId = navigation.getParam('courseId', '')
    api.get(
      `/serie_chapters/${courseId}`,
    ).then((response) => {
      console.log(response.data.data, '<-- received single course from API');
      const newData = response.data.data;
      this.setState({
        course: newData,
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

  getCategoryDescription = (categoryTitle, menuCategoryItems) => {
    const foundItem = menuCategoryItems.find(x => x.title === categoryTitle);
    return foundItem ? foundItem.description : '';
  }

  getCategoryId = (categoryTitle, menuCategoryItems) => {
    const foundItem = menuCategoryItems.find(x => x.title === categoryTitle);
    return foundItem ? foundItem.id : '';
  }

  downloadObject(fileURI, fileType) {
    CameraRoll.saveToCameraRoll( fileURI, fileType);
  }

  render() {
    const { navigation } = this.props;
    const { search, searchActive, loading, course } = this.state;
    if (loading) {
      return (
        <Loading size={'large'} />
      );
    }
    return (
      <ScrollView style={styles.container}>
        <View style={styles.textContainer}>
          <Text
            style={styles.courseTitle}
          >
            {course.attributes.title}
          </Text>
          <Text
            style={styles.courseDescription}
          >
            {course.attributes.description}
          </Text>
        </View>
        { course.attributes.video_url
          ? (
            <View style={styles.videoBodyContainer}>
              <Video
                source={{ uri: course.attributes.video_url }}
                rate={1.0}
                volume={1.0}
                isMuted={false}
                // resizeMode={Video.RESIZE_MODE_CONTAIN}
                resizeMode='cover'
                shouldPlay
                // isLooping
                onLoadStart={this._onLoadStart}
                onLoad={this._onLoad}
                usePoster
                posterSource={require('../assets/images/loading_video.gif')}
                useNativeControls
                style={{ width: 300, height: 300 }}
              />
            </View>
          ) : null }
        <View style={styles.textContainer}>
          { course.attributes.audio_url
            ? (
              <View style={styles.buttonContainer}>
                <Button
                  onPress={() => this.downloadObject(course.attributes.audio_url, 'video')}
                >
                Descargar Audio
                </Button>
              </View>
            ) : null
          }
          { course.attributes.image_url
            ? (
              <View style={styles.buttonContainer}>
                <Button
                  onPress={() => this.downloadObject(course.attributes.image_url, 'photo')}
                >
                Descargar Imágenes
                </Button>
              </View>
            ) : null
          }
          { course.attributes.notes_url
            ? (
              <View style={styles.buttonContainer}>
                <Button
                  onPress={() => this.downloadObject(course.attributes.notes_url, 'photo')}
                >
                Descargar Notas
                </Button>
              </View>
            ) : null
          }
        </View>
      </ScrollView>
    );
  }
}

export default withNavigation(IndCursoScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  bannerContainer: {
    backgroundColor: '#fff',
    marginTop: 10,
    height: 120,
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
  buttonContainer: {
    alignItems: 'center',
  },
  textContainer: {
    marginTop: 20,
    marginLeft: 10,
  },
  image: {
    resizeMode: 'cover',
    height: 120,
  },
  videoBodyContainer: {
    height: 300,
    alignItems: 'center',
    marginTop: 20,
  },
  cursosContainer: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 5,
    marginLeft: 8,
    marginRight: 8,
  },
  icon: {
    width: 24,
    height: 24,
  },
  sectionTitle: {
    color: '#FF953C',
  },
  homePageTitle: {
    color: '#262659',
    fontSize: 18,
    fontFamily: 'gilroy',
    marginLeft: 10,
  },
  homePageDescription: {
    marginTop: 8,
    color: '#615195',
    fontSize: 22,
    fontFamily: 'gilroy',
    alignSelf: 'center',
    textAlign: 'center',
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    width: '95%',
    marginBottom: 10,
  },
  courseDescription: {
    fontSize: 14,
    width: '95%',
  },
});
