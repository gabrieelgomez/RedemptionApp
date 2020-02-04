import React, { Fragment } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { withNavigation } from 'react-navigation';
import Loading from '../components/common/Loading';
import Header from '../components/Header';

class AboutUsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    this.setState({
      loading: false,
    });
  }

  render() {
    const { loading } = this.state;
    if (loading) {
      return (
        <Loading size={'large'} />
      );
    }
    return (
      <View style={styles.container}>
        <Header
          title='About Us'
          dark
        />
        <Text>AboutUs View</Text>
      </View>
    );
  }
}

export default withNavigation(AboutUsScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eaecef',
  },
});
