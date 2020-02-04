import React, { Fragment } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import { SearchBar } from 'react-native-elements';
import { Ionicons } from 'react-native-vector-icons';
import { withNavigation } from 'react-navigation';
import deviceStorage from '../services/deviceStorage';
import SearchResultList from '../components/Search/SearchResultList';
import SearchCategoryResultList from '../components/Search/SearchCategoryResultList';
import FeaturedActivityList from '../components/Home/FeaturedActivityList';
import MinisterioList from '../components/Home/MinisterioList';
import VendorList from '../components/Home/VendorList';
import Loading from '../components/common/Loading';
import TextLink from '../components/common/TextLink';
import { t } from '../services/i18n';
import * as api from '../services/api';

import Carousel from 'react-native-snap-carousel';

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      searchActive: false,
      vendors: [],
      offers: [],
      coupons: [],
      dataSearchResults: [],
      search: '',
      typingTimeout: 0,
      error: '',
    };
    this.searchArrayHolder = [];
    this.apiSearch = this.apiSearch.bind(this);
  }

  componentDidMount() {
    this.getVendors();
    this.getOffers();
    this.getCoupons();
  }

  getVendors() {
    api.get(
      `vendors`,
    ).then((response) => {
      const newData = response.data.data;
      console.log(newData);
      this.setState({
        vendors: newData,
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

  getOffers() {
    api.get(
      `offers`,
    ).then((response) => {
      const newData = response.data.data;
      console.log(newData);
      this.setState({
        offers: newData,
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

  getCoupons() {
    api.get(
      `coupons`,
    ).then((response) => {
      const newData = response.data.data;
      console.log(newData);
      this.setState({
        coupons: newData,
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
        dataSearchResults: [],
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
    let activities = [];
    results.forEach((searchItem) => {
      if (searchItem['_index'] === 'celebrities') {
        activities = [...activities, { ...searchItem['_source'] }];
      } else if (searchItem['_index'] === 'professions') {
        professions = [...professions, { ...searchItem['_source'] }]
      }
    });
    return { activities, professions };
  };

  // deprecated in favor of elastiSearch (direct to elastiSearch instead of going through API)
  apiSearch = (searchString) => {
    api.get(
      `/omnisearch?s=${searchString}`,
    ).then((response) => {
      this.dataSearchArray = response.data.data;
      const dataSearch = this.dataSearchArray.filter((item) => {
        const itemData = `${item.attributes.name.toUpperCase()}`;
        const textData = searchString.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      console.log(dataSearch, '<-- Data returned by search');
      this.setState({
        dataSearchResults: dataSearch,
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
      dataSearchResults: [],
      loading: false,
    });
  }

  handlePressVendor = (vendorId) => {
    const { navigation } = this.props;
    this.clearSearchStars();
    navigation.navigate('ActivityProfile', { vendorId });
  }

  getCategoryDescription = (categoryTitle, menuCategoryItems) => {
    const foundItem = menuCategoryItems.find(x => x.title === categoryTitle);
    return foundItem ? foundItem.description : '';
  }

  getCategoryId = (categoryTitle, menuCategoryItems) => {
    const foundItem = menuCategoryItems.find(x => x.title === categoryTitle);
    return foundItem ? foundItem.id : '';
  }

  _renderCategories = ({item, index}) => {
    return (
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <Image
          style={{width: 50, height: 50, borderRadius: 40,}}
          source={{uri: item.attributes.logo.url}}
        />
        <Text style={styles.titleContentCarousel} >{item.attributes.title}</Text>
      </View>
    );
  }

  _renderOffers = ({item, index}) => {
    return (
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <Image
          style={{width: 50, height: 50}}
          source={{uri: 'https://img.youtube.com/vi/VOgFZfRVaww/hqdefault.jpg'}}
        />
        <Text style={styles.titleContentCarousel} >Shop for min B${item.attributes.points} & earn {item.attributes.max_points} Points at {item.attributes.vendor.name}</Text>
      </View>
    );
  }

  _renderCoupons = ({item, index}) => {
    return (
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <Image
          style={{width: 50, height: 50}}
          source={{uri: 'https://img.youtube.com/vi/VOgFZfRVaww/hqdefault.jpg'}}
        />
        <Text style={styles.titleContentCarousel} >Get {<Text style={{ textTransform: 'capitalize'}} >{item.attributes.coupon_type}</Text>} {item.attributes.name}</Text>
      </View>
    );
  }

  _renderVendors = ({item, index}) => {
    return (
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <Image
          style={{width: 50, height: 50}}
          source={{uri: item.attributes.logo.url}}
        />
        <Text style={styles.titleContentCarousel} >{item.attributes.title}</Text>
      </View>
    );
  }

  toggleSearchResultsView(props) {
    const {
      searchActive,
      dataSearchResults,
      vendors,
      offers,
      coupons,
    } = this.state;
    const { handlePressCategory, activeCategory, menuCategoryItems, currentUser } = props.screenProps;
    const { navigation } = this.props;
    if (searchActive) {
      return (
        <View style={styles.searchResultsContainer}>
          <SearchResultList
            onPress={itemId => this.handlePressResult(itemId)}
            results={dataSearchResults}
          />
        </View>
      );
    }
    return (
      <ScrollView>
        <View style={styles.rowContainer}>
          <View style={styles.rowTitleStrip}>
            <Text style={styles.titleCarousel}>Search by Category</Text>
            <TextLink style={{ height: 50 }} textColor={'#001fb5'}onPress={() => navigation.navigate('Vendors')}>
              {t('HomeScreen:viewAll')}
            </TextLink>
          </View>
          <View style={styles.listContainer}>
            <Carousel
              data={vendors}
              renderItem={this._renderCategories}
              sliderWidth={500}
              itemWidth={200}
            />
          </View>
        </View>

        <View style={styles.rowContainer}>
          <View style={styles.rowTitleStrip}>
            <Text style={styles.titleCarousel}>Offers for You</Text>
            <TextLink style={{ height: 50 }} textColor={'#001fb5'} onPress={() => navigation.navigate('Vendors')}>
              {t('HomeScreen:viewAll')}
            </TextLink>
          </View>
          <View style={styles.listContainer}>
            <Carousel
              ref={(c) => { this._carousel = c; }}
              data={offers}
              renderItem={this._renderOffers}
              sliderWidth={500}
              itemWidth={200}
            />
          </View>
        </View>

        <View style={styles.rowContainer}>
          <View style={styles.rowTitleStrip}>
            <Text style={styles.titleCarousel}>Coupons for You</Text>
            <TextLink style={{ height: 50 }} textColor={'#001fb5'} onPress={() => navigation.navigate('Vendors')}>
              {t('HomeScreen:viewAll')}
            </TextLink>
          </View>
          <View style={styles.listContainer}>
            <Carousel
              ref={(c) => { this._carousel = c; }}
              data={coupons}
              renderItem={this._renderCoupons}
              sliderWidth={500}
              itemWidth={200}
            />
          </View>
        </View>

        <View style={styles.rowContainer}>
          <View style={styles.rowTitleStrip}>
            <Text style={styles.titleCarousel}>Top Brands</Text>
            <TextLink style={{ height: 50 }} textColor={'#001fb5'} onPress={() => navigation.navigate('Vendors')}>
              {t('HomeScreen:viewAll')}
            </TextLink>
          </View>
          <View style={styles.listContainer}>
            <Carousel
              ref={(c) => { this._carousel = c; }}
              data={vendors}
              renderItem={this._renderVendors}
              sliderWidth={500}
              itemWidth={200}
            />
          </View>
        </View>

      </ScrollView>
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
          placeholder={t('HomeScreen:searchPlaceholder')}
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
        {this.toggleSearchResultsView(this.props)}
      </View>
    );
  }
}

export default withNavigation(HomeScreen);

const styles = StyleSheet.create({
  carouselContainer: {
    height: 200,
    width: 100
  },
  container: {
    flex: 1,
    backgroundColor: '#eaecef',
  },
  categoryRowContainer: {
    backgroundColor: 'yellow',
    flexDirection: 'column',
    flex: 1.5,
  },
  rowContainer: {
    flexDirection: 'column',
    flex: 2,
    backgroundColor: 'white',
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
    padding: 9
  },
  titleCarousel: {
    color: '#b59900'
  },
  titleContentCarousel: {
    color:'#000',
    textTransform: 'capitalize',
  },
  viewAllCarousel: {
    height: 50,
    color: '#001fb5'
  },
  rowTitleStrip: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  listContainer: {
    flex: 1,
    height: 100,
    flexDirection: 'column',
  },
  searchResultsContainer: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 10,
    marginLeft: 8,
    marginRight: 8,
  },
  homeContentContainer: {
    flexDirection: 'column',
    backgroundColor: '#fff',
    marginTop: 5,
    marginLeft: 0,
    marginRight: 0,
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
