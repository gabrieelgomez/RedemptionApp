import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Platform
} from 'react-native';

export default class Header extends React.Component {
  render() {
    return (
      <View style={{
        backgroundColor: this.props.dark ? '#262659' : '#fff',
        height: 40,
        alignSelf: 'stretch',
        marginTop: 20,
        justifyContent: 'center',
        elevation: 2,
        position: 'relative',
      }}
      >
        <Text style={{
          color: this.props.dark ? 'white' : 'black',
          textAlign: 'center',
          fontWeight: 'bold',
          textTransform: 'uppercase',
          fontSize: 20,
          fontFamily:
            Platform.OS === 'ios' ? 'AvenirNext-Regular' : 'Roboto',
                    }}
        >
        {this.props.title}
        </Text>
      </View>
    );
  }
}
