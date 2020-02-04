import React from 'react';
import { Text } from 'react-native';

const TitleText = ({ children, style }) => {
  return (
    <Text
      style={[localStyles.text, style]}
    >
      {children}
    </Text>
  );
};

const localStyles = {
  text: {
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 24,
    lineHeight: 28,
    fontFamily: 'gilroySemiBold',
    color: '#ff6c58',
    textDecorationLine: 'none',
  },
};

export default TitleText;
