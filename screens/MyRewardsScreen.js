import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Platform,
} from 'react-native';
import { withNavigation } from 'react-navigation';
import QRBarCode from '../components/Rewards/QRBarCode';
import RewardsPoints from '../components/Rewards/RewardsPoints';
import TransactionList from '../components/Transaction/TransactionList';
import Loading from '../components/common/Loading';
import Button from '../components/common/Button';
import Header from '../components/Header';

import * as api from '../services/api';

class MyRewardsScreen extends React.Component {

  constructor(props) {
    super(props);
    object = props.navigation.getParam('object', '')
    this.state = {
      loading: true,
      transactions: [],
      error: '',
    };
  }

  componentDidMount() {
    this.getTransactions();
  }

  getTransactions() {

    api.get(
      `transactions?`,
    ).then((response) => {
      const newData = response.data.data;
      console.log(newData);
      this.setState({
        transactions: newData,
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

  render() {
    const { navigation, screenProps } = this.props;
    const { transactions, loading } = this.state;
    const { currentUser } = screenProps;

    if (loading) {
      return (
        <Loading size={'large'} />
      );
    }
    return (
      <View style={styles.container}>
        <Header
          title="My Rewards"
          dark
        />

        <RewardsPoints currentUser={currentUser} navigation={navigation}/>
        <QRBarCode currentUser={currentUser}/>

        <View
          style={styles.scrollContainer}
        >
          <TransactionList
            style={{ justifyContent: 'space-evenly' }}
            transactions={transactions}
            getNavigate={this.props.navigation}
          />
        </View>
      </View>
    );
  }
}

export default withNavigation(MyRewardsScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  scrollContainer: {
    flex: 1,
    flexDirection: 'column',
  },
});
