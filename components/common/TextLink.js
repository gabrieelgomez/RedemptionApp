import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const TextLink = ({ onPress, children, textColor = 'black' }) => {
  const { button, text } = styles;
  return (
    <View style={{}}>
      <TouchableOpacity onPress={onPress} style={button}>
        <Text
          style={[text, { color: textColor }]}
        >
          {children}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  text: {
    alignSelf: 'center',
    fontSize: 14,
    fontFamily: 'gilroy',
    fontWeight: '400',
    textDecorationLine: 'none',
    paddingBottom: 0
  },
  button: {
    marginTop: 5,
    marginBottom: 5
  }
};

export default TextLink;
