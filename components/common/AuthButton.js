import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const AuthButton = ({ onPress, children }) => {
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
    fontSize: 18,
    fontFamily: 'gilroy',
    fontWeight: 'bold',
    paddingTop: 10,
    paddingBottom: 10,
  },
  button: {
    borderWidth: 3,
    borderRadius: 25,
    borderColor: '#262659',
    backgroundColor: '#262659',
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    minWidth: 200,
  },
};

export default AuthButton;
