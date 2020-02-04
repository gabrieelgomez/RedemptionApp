import React from 'react';
import { View, TextInput, Text } from 'react-native';

const RegistrationInput = ({ label, value, onChangeText, placeholder, secureTextEntry, multiline, numberOfLines }) => {
const {inputStyle, labelStyle, containerStyle } = styles;

  return (
    <View style={containerStyle}>
      <TextInput
        secureTextEntry={secureTextEntry}
        autoCapitalize='none'
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        autoCorrect={false}
        multiline={multiline}
        numberOfLines={numberOfLines}
        style={inputStyle}
      />
    </View>
  );
};

const styles = {
  containerStyle: {
    height: 40,
    width: '95%',
    alignSelf: 'center',
    borderColor: '#262659',
    borderBottomWidth: 2,
    marginTop: 10,
  },
  inputStyle: {
    color: '#000',
    fontSize: 18,
    fontFamily: 'gilroy',
    lineHeight: 23,
    alignSelf: 'center',
    paddingTop: 10,
  },
};

export default RegistrationInput;
