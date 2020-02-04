import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const BackButton = ({ onPress, children }) => {
  const { button, text } = styles;
  return (
    <View style={{flexDirection: 'row'}}>
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
    alignSelf: 'center',
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
    paddingBottom: 10,
    paddingTop: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    flex: 1,
    borderWidth: 3,
    borderColor: 'orange',
    backgroundColor: 'orange',
    borderRadius: 25,
    marginTop: 5,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 5,
    alignItems: 'center',
    justifyContent: 'center',
  }
};

export { BackButton };
