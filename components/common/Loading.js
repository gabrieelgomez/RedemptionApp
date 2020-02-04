import React from 'react';
import { View, ActivityIndicator } from 'react-native';

const Loading = ({ size, position = 'center' }) => (
  <View style={position === 'center' ? styles.centerContainer : styles.upperContainer}>
    <ActivityIndicator size={size} />
  </View>
);

const styles = {
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  upperContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
};

export default Loading;
