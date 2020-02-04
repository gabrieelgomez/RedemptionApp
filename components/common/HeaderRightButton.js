import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const HeaderRightButton = (props) => {
  const { text, onPress } = props;
  return (
    <View style={{}}>
      <TouchableOpacity onPress={onPress} style={styles.button}>
        <Text style={styles.styleText}>
          {text}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  styleText: {
    alignSelf: 'center',
    color: '#262659',
    fontSize: 18,
    fontFamily: 'gilroy',
    fontWeight: 'bold',
    textDecorationLine: 'none',
    paddingRight: 10,
  },
  button: {
    paddingTop: 5,
    paddingBottom: 5,
  },
};

export default HeaderRightButton;
