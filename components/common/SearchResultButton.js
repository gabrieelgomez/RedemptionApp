import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const SearchResultButton = ({ onPress, children }) => {
  const { button, text } = styles;
  return (
    <View style={{ flexDirection: 'row' }}>
      <TouchableOpacity onPress={onPress} style={button}>
        <Text style={text}>
          {children}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SearchResultButton;

const styles = {
  text: {
    textAlign: 'center',
    fontSize: 13,
    fontFamily: 'gilroy',
    color: '#555555',
    paddingTop: 3,
    paddingBottom: 4,
    paddingLeft: 10,
    paddingRight: 10,
  },
  button: {
    borderWidth: 1,
    borderColor: '#58B0CB',
    borderRadius: 12,
    backgroundColor: '#fff',
    marginTop: 8,
    marginLeft: 10,
  },
};
