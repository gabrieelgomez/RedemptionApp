import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import { Video } from 'expo-av';
import { Ionicons } from 'react-native-vector-icons';
import { withNavigation } from 'react-navigation';
import deviceStorage from '../services/deviceStorage';
import CursoList from '../components/Curso/CursoList';
import Loading from '../components/common/Loading';
import * as api from '../services/api';

class IndMessageScreen extends React.Component {

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
      serie: [],
      categories: [],
      typingTimeout: 0,
      error: '',
    };
  }

  componentDidMount() {
    this.getSerie();
  }

  getSerie() {
    const { screenProps, navigation } = this.props;
    const { activeCategory, menuCategoryItems, currentUser } = screenProps;
    const categoryId = this.getCategoryDescription(activeCategory, menuCategoryItems);
    const serieId = navigation.getParam('messageId', '')
    api.get(
      `/series/${serieId}`,
    ).then((response) => {
      console.log(response.data.data, '<-- received single serie from API');
      const newData = response.data.data;
      this.setState({
        serie: newData,
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

  getCourses() {
    const { screenProps, navigation } = this.props;
    const { activeCategory, menuCategoryItems, currentUser } = screenProps;
    const categoryId = this.getCategoryDescription(activeCategory, menuCategoryItems);
    const serieId = navigation.getParam('serieId', '')
    api.get(
      `/serie/${serieId}`,
    ).then((response) => {
      console.log(response.data.data, '<-- received single serie from API');
      const newData = response.data.data;
      this.setState({
        serie: newData,
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

  handlePressCurso = (courseId) => {
    console.log(`clicked ${courseId}`);
    const { navigation } = this.props;
    navigation.navigate('IndCurso', { courseId: courseId });
  }

  getCategoryDescription = (categoryTitle, menuCategoryItems) => {
    const foundItem = menuCategoryItems.find(x => x.title === categoryTitle);
    return foundItem ? foundItem.description : '';
  }

  getCategoryId = (categoryTitle, menuCategoryItems) => {
    const foundItem = menuCategoryItems.find(x => x.title === categoryTitle);
    return foundItem ? foundItem.id : '';
  }

  render() {
    const { navigation } = this.props;
    const { search, searchActive, loading, serie } = this.state;
    if (loading) {
      return (
        <Loading size={'large'} />
      );
    }
    return (
      <View style={styles.container}>
        <View style={styles.bannerContainer}>
          <Image
            source={{
              uri: serie.attributes.image.large.url,
              cache: 'force-cache',
            }}
            style={styles.image}
          />
        </View>
        <ScrollView style={styles.cursosContainer}>
          <CursoList
            style={{ justifyContent: 'space-evenly' }}
            cursos={serie.attributes.serie_chapters}
            handlePressCurso={this.handlePressCurso}
          />
        </ScrollView>
      </View>
    );
  }
}

export default withNavigation(IndMessageScreen);

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
  image: {
    resizeMode: 'cover',
    height: 120,
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
});
