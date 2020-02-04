import React from 'react';
import { View, TextInput, Text } from 'react-native';

const EditInput = ({ keyboardType, autoCapitalizeProp, label, value, onChangeText, placeholder, secureTextEntry, multiline, numberOfLines }) => {
const {inputStyle, labelStyle, containerStyle } = styles;

  return (
    <View style={containerStyle}>
      <Text style={labelStyle}>{label}</Text>
      <TextInput
        secureTextEntry={secureTextEntry}
        autoCapitalize={autoCapitalizeProp}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        autoCorrect={false}
        multiline={multiline}
        numberOfLines={numberOfLines}
        style={inputStyle}
        keyboardType={keyboardType}
      />
    </View>
  );
};

const styles = {
  containerStyle: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  labelStyle: {
    flex: 1,
    fontSize: 16,
    marginBottom: 4,
  },
  inputStyle: {
    width: 300,
    color: '#666',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingRight: 5,
    paddingLeft: 10,
    paddingTop: 7,
    paddingBottom: 7,
    fontSize: 16,
    shadowOffset: { width: 5, height: 5 },
    shadowColor: 'grey',
    shadowOpacity: 0.2,
  },
};

export default EditInput;
