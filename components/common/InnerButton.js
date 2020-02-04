import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const InnerButton = ({ onPress, children }) => {
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

const styles = {
  text: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
    fontFamily: 'gilroy',
    fontWeight: 'bold',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 5,
    paddingRight: 5,
  },
  button: {
    borderWidth: 3,
    borderRadius: 15,
    borderColor: '#262659',
    backgroundColor: '#262659',
    marginTop: 5,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 5,
    minWidth: 50,
  },
};

export default InnerButton;
