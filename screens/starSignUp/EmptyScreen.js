import React, { Component } from 'react';
import { View } from 'react-native';
// import Registration from '../components/Registration';

export default class EmptyScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  render() {
    return (
      <View style={styles.container}>

      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',

  },
};
