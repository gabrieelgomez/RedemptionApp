import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SearchBar } from 'react-native-elements';
import { Ionicons } from 'react-native-vector-icons';
import { withNavigation } from 'react-navigation';
import deviceStorage from '../services/deviceStorage';
import SearchResultList from '../components/Search/SearchResultList';
import SearchCategoryResultList from '../components/Search/SearchCategoryResultList';
import EventList from '../components/Event/EventList';
import Loading from '../components/common/Loading';
import * as api from '../services/api';
import * as apiV2 from '../services/api_v2';

class EventsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      searchActive: false,
      stars: [],
      starSearchResults: [],
      categories: [],
      search: '',
      typingTimeout: 0,
      error: '',
    };
    this.searchArrayHolder = [];
    this.apiSearch = this.apiSearch.bind(this);
  }

  componentDidMount() {
    this.getStars();
  }

  getStars() {
    const { screenProps } = this.props;
    const { activeCategory, menuCategoryItems, currentUser } = screenProps;
    const categoryId = this.getCategoryDescription(activeCategory, menuCategoryItems);
    api.get(
      `/user/fan/celebrity_list/?profession=${categoryId}`,
    ).then((response) => {
      const newData = response.data.data.celebrity_list;
      this.setState({
        stars: newData,
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

  handleSearchTyping = (searchString) => {
    const { typingTimeout } = this.state;
    this.setState({
      search: searchString,
    });
    if (searchString === '') {
      this.setState({
        searchActive: false,
        starSearchResults: [],
        loading: false,
      });
      return;
    }
    if (searchString.length < 3) {
      return;
    }
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }
    this.setState({
      typingTimeout: setTimeout(() => {
        this.apiSearch(searchString);
      }, 500),
    });
  }

  parseSearchResult = (results) => {
    let professions = [];
    let stars = [];
    results.forEach((searchItem) => {
      if (searchItem['_index'] === 'celebrities') {
        stars = [...stars, { ...searchItem['_source'] }];
      } else if (searchItem['_index'] === 'professions') {
        professions = [...professions, { ...searchItem['_source'] }]
      }
    });
    return { stars, professions };
  };

  // deprecated in favor of elastiSearch (direct to elastiSearch instead of going through API)
  apiSearch = (searchString) => {
    apiV2.get(
      `/user/fan/suggestion_list?s=${searchString}`,
    ).then((response) => {
      this.dataCelebritiesArray = response.data.data.suggestion_list.celebrities;
      const dataCelebrities = this.dataCelebritiesArray.filter((item) => {
        const itemData = `${item.nick_name.toUpperCase()}`;
        const textData = searchString.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      this.dataProfessionsArray = response.data.data.suggestion_list.professions;
      const dataProfessions = this.dataProfessionsArray.filter((item) => {
        const itemData = item.title.toUpperCase();
        const textData = searchString.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      this.setState({
        starSearchResults: dataCelebrities,
        categories: dataProfessions,
        searchActive: true,
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

  clearSearchStars = () => {
    this.setState({
      searchActive: false,
      search: '',
      starSearchResults: [],
      loading: false,
    });
  }

  handlePressEvent = (eventId) => {
    const { navigation } = this.props;
    navigation.navigate('Event', { eventId });
  }

  getCategoryDescription = (categoryTitle, menuCategoryItems) => {
    const foundItem = menuCategoryItems.find(x => x.title === categoryTitle);
    return foundItem ? foundItem.description : '';
  }

  getCategoryId = (categoryTitle, menuCategoryItems) => {
    const foundItem = menuCategoryItems.find(x => x.title === categoryTitle);
    return foundItem ? foundItem.id : '';
  }

  toggleSearchResultsView(props) {
    const {
      searchActive,
      starSearchResults,
      categories,
      events,
    } = this.state;
    const { handlePressCategory, activeCategory, menuCategoryItems, currentUser } = props.screenProps;
    console.log(currentUser, '<== currentUser');
    console.log(currentUser.attributes.email, '<== currentUserEmail');
    if (searchActive) {
      return (
        <View style={styles.searchResultsContainer}>
          <SearchCategoryResultList
            onPress={categoryId => handlePressCategory(categoryId)}
            categories={categories}
          />
          <SearchResultList
            onPress={starId => this.handlePressStar(starId)}
            stars={starSearchResults}
          />
        </View>
      );
    }
    return (
      <View style={styles.homeContentContainer}>
        <Text style={styles.homePageTitle}>
          Events Go HERE
        </Text>
        <Text style={styles.homePageTitle}>
          {currentUser.attributes.email}
        </Text>
        <Text style={styles.homePageDescription}>
          {this.getCategoryDescription(activeCategory, menuCategoryItems)}
        </Text>
        <EventList
          events={events}
          onPress={eventId => this.handlePressEvent(eventId)}
        />
      </View>
    );
  }

  render() {
    const { navigation } = this.props;
    const { search, searchActive, loading } = this.state;
    if (loading) {
      return (
        <Loading size={'large'} />
      );
    }
    return (
      <View style={styles.container}>
        <SearchBar
          round
          onChangeText={text => this.handleSearchTyping(text)}
          onClear={this.clearSearchStars}
          placeholder='Buscar Eventos'
          placeholderTextColor='#999999'
          value={search}
          inputContainerStyle={styles.searchInputContainer}
          inputStyle={styles.searchText}
          containerStyle={styles.searchContainer}
          searchIcon={(
            <Ionicons
              style={styles.iconSearchStyle}
              name='ios-search'
              size={28}
              color='#FF953C'
            />
          )}
        />
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
          keyboardShouldPersistTaps='always'
        >
          {this.toggleSearchResultsView(this.props)}
        </ScrollView>
      </View>
    );
  }
}

export default withNavigation(EventsScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchResultsContainer: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 10,
    marginLeft: 8,
    marginRight: 8,
  },
  homeContentContainer: {
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
  searchContainer: {
    backgroundColor: 'white',
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  searchInputContainer: {
    backgroundColor: '#f6f6f6',
    borderColor: '#f6f6f6',
    borderWidth: 2,
    borderBottomWidth: 2,
  },
  searchText: {
    color: '#615195',
    fontWeight: '600',
    fontFamily: 'gilroy',
    fontSize: 20,
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
