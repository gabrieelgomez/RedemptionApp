import React from 'react';
import { View, TextInput, Text, Image } from 'react-native';

const ResponsibleUserCard = (props) => {
const {inputStyle, labelStyle, containerStyle, responsibleUserTitle, imageContainerStyle, textContainerStyle, innerContainerStyle } = styles;

  return (
    <View style={containerStyle}>
      <View style={innerContainerStyle}>
        <View style={imageContainerStyle}>
          <Image
          source={{
            uri: props.image,
            cache: 'force-cache',
          }}
            style={{
              width: '100%',
              height: '100%',
              resizeMode: 'contain',
              alignSelf: 'center',
            }}
          />
        </View>
        <View style={textContainerStyle}>
          <Text style={responsibleUserTitle}>
            {props.intro}
          </Text>
          <Text>
            Contacto: {props.name}
          </Text>
          <Text>
            Teléfono: {props.phone}
          </Text>
          <Text>
            Correo: {props.email}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = {
  containerStyle: {
    flex: 1,
    width: '95%',
    backgroundColor: '#eee',
    alignSelf: 'center',
    borderColor: '#2e78b7',
    borderWidth: 1,
    marginTop: 20,
  },
  innerContainerStyle: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 5,
    marginBottom: 5,
    marginRight: 5,
    marginLeft: 5,
  },
  imageContainerStyle: {
    flex: 0.3,
  },
  textContainerStyle: {
    flex: 0.7,
    flexDirection: 'column',
  },
  responsibleUserTitle: {
    marginTop: 5,
    marginBottom: 5,
    fontSize: 14,
    fontFamily: 'gilroy',
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

export default ResponsibleUserCard;
