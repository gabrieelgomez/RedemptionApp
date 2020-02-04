import React, { Fragment } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
import { withNavigation } from 'react-navigation';
import Loading from '../components/common/Loading';
import OffersList from '../components/Offers/OffersList';
import CouponsList from '../components/Coupons/CouponsList';
import Carousel from 'react-native-snap-carousel';
import * as api from '../services/api';
import { Container, Tab, Tabs} from 'native-base';

class WalletScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      offers: [],
      coupons: [],
    };
  }

  componentDidMount() {
    this.getOffers();
    this.getCoupons();

    this.setState({
      loading: false,
    });
  }

  getOffers() {
    api.get(
      `offers/own_offers?`,
    ).then((response) => {
      const newData = response.data.data;
      console.log(newData);
      this.setState({
        offers: newData,
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
      `coupons/own_coupons?`,
    ).then((response) => {
      const newData = response.data.data;
      console.log(newData);
      this.setState({
        coupons: newData,
      });
    }).catch((error) => {
      console.log(error);
      this.setState({
        error: 'Error retrieving data',
        loading: false,
      });
    });
  }


  render() {
    const { loading, offers, coupons } = this.state;
    if (loading) {
      return (
        <Loading size={'large'} />
      );
    }
    return (
      <Container>
        <Tabs tabBarUnderlineStyle={styles.tabContainer}>

          <Tab
            tabStyle={styles.backgroundWhiteContainer}
            activeTabStyle={styles.backgroundWhiteContainer}
            textStyle={styles.textTabStyle}
            activeTextStyle={styles.textTabActive}
            heading='Offers'
          >
            <OffersList
              offers={offers}
              getNavigate={this.props.navigation}
            />
          </Tab>
          <
          Tab
            tabStyle={styles.backgroundWhiteContainer}
            activeTabStyle={styles.backgroundWhiteContainer}
            textStyle={styles.textTabStyle}
            activeTextStyle={styles.textTabActive}
            heading='Coupons'
          >
            <CouponsList
              coupons={coupons}
              getNavigate={this.props.navigation}
            />
          </Tab>

        </Tabs>
      </Container>
    );
  }
}

export default withNavigation(WalletScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eaecef',
  },
  tabContainer:{
    backgroundColor: '#262659'
  },
  backgroundWhiteContainer:{
    backgroundColor: '#fff'
  },
  textTabStyle:{
    color: '#737373',
    fontWeight: 'bold',
  },
  textTabActive:{
    color: '#262659'
  },
});
