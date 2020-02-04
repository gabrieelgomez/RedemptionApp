import React, { Component } from 'react';
import { StyleSheet, View, Text} from 'react-native';
import { withNavigation } from 'react-navigation';

export default class RewardsPoints extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render() {
    const { navigation, currentUser } = this.props;

    return (
      <View style={{ backgroundColor: '#262659' }}>
        <View style={styles.containerPoints}>
          <View style={styles.containerLeftPoints}>
            <Text style={styles.fontText}>Your Rewards Points</Text>
            <Text style={styles.fontText}>{currentUser.attributes.balance}</Text>
          </View>

          <View style={styles.containerRightPoints}>
            <Text style={styles.fontText}>Points are worth</Text>
            <Text style={[styles.fontText, { color: '#54b904' }]}>B$ {currentUser.attributes.balance_country_rate}</Text>
          </View>
        </View>

        <View style={styles.containerBottomPoints}>
          <View style={{ marginBottom: 10 }}>
            <Text style={{fontSize: 15, color: '#f8e700' }} onPress={() => navigation.navigate('Redeem')}>Redeem</Text>
          </View>

          <View>
            <Text style={{fontSize: 15, color: 'yellow' }}>Send points to someone</Text>
          </View>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerPoints: {
    height: 50,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingLeft: 5,
  },
  containerLeftPoints: {
    flex: 0.5,
    alignItems: 'center',
    flexDirection: 'column',
  },
  containerRightPoints: {
    flex: 0.5,
    alignItems: 'center',
    flexDirection: 'column',
  },
  containerBottomPoints: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    padding: 10,
  },
  fontText:{
    color: 'white',
    fontSize: 20
  },
});
