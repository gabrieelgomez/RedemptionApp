import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import { Ionicons } from 'react-native-vector-icons';
import { withNavigation } from 'react-navigation';
import deviceStorage from '../services/deviceStorage';
import CursoList from '../components/Curso/CursoList';
import Loading from '../components/common/Loading';
import * as api from '../services/api';

class CursosScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      series: [],
      categories: [],
      typingTimeout: 0,
      error: '',
    };
  }

  componentDidMount() {
    this.getSeries();
  }

  getSeries() {
    const { screenProps } = this.props;
    const { activeCategory, menuCategoryItems, currentUser } = screenProps;
    const categoryId = this.getCategoryDescription(activeCategory, menuCategoryItems);
    api.get(
      '/series',
    ).then((response) => {
      console.log(response.data.data, '<-- received from API');
      const newData = response.data.data;
      this.setState({
        series: newData,
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

  handlePressSerie = (serieId) => {
    console.log(`clicked ${serieId}`);
    const { navigation } = this.props;
    navigation.navigate('Serie', { serieId: serieId });
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
    const { search, searchActive, loading, series } = this.state;
    if (loading) {
      return (
        <Loading size={'large'} />
      );
    }
    return (
      <View style={styles.container}>
        <View style={styles.bannerContainer}>
          <Image
            source={require('../assets/images/predicas.jpg')}
            style={styles.image}
          />
        </View>
        <ScrollView style={styles.seriesContainer}>
          <SerieList
            style={{ justifyContent: 'space-evenly' }}
            series={series}
            handlePressSerie={this.handlePressSerie}
          />
        </ScrollView>
      </View>
    );
  }
}

export default withNavigation(CursosScreen);

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
  image: {
    resizeMode: 'cover',
    height: 120,
  },
  seriesContainer: {
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
