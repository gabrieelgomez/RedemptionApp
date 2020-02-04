import React from 'react';
import { Text, StyleSheet, View, ImageBackground, TouchableWithoutFeedback } from 'react-native';
import { withNavigation } from 'react-navigation';

class MinisterioDetail extends React.Component {

  render() {
    const pic = { uri: this.props.ministerio.attributes.app_image };
    return (
      <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('Activity', { ministerio_id: this.props.ministerio.id })}>
      <View style={styles.viewContainer}>
        <ImageBackground source={pic} style={styles.imgContainer}>
          <Text style={styles.titleText}>
            {this.props.ministerio.attributes.name}
          </Text>
        </ImageBackground>
      </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  viewContainer: {
    flex: 0.25,
    backgroundColor: 'transparent',
  },
 imgContainer: {
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'transparent',
  },
  titleText: {
    color: "#fff",
    fontSize: 40,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  }
});

export default withNavigation(MinisterioDetail);
