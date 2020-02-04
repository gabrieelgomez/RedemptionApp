import React from 'react';
import { Text, StyleSheet, View, TouchableHighlight } from 'react-native';
import * as api from '../../services/api';
import MinisterioDetail from './MinisterioDetail';

export default class MinisterioList extends React.Component {
  constructor() {
    super();
    this.state = {
      ministerios: []
    };
  }

  componentWillMount() {
    api.get('/ministerios')
    .then(response => this.setState({
      ministerios: response.data.data
    }))
  }

  renderCategories() {
    return this.state.ministerios.map (ministerio =>
      <MinisterioDetail
        key={ministerio.id}
        ministerio={ministerio}
      />
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderCategories()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
 container: {
    flex: 1,
    backgroundColor: '#eee',
    justifyContent: 'space-between',
  }
});
