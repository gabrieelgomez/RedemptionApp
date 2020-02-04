import React from 'react';
import { View, TouchableOpacity, Text, ImageBackground } from 'react-native';
import { getStarBookingPriceFromStar } from '../../lib/pricing';

const BookFooter = (props) => {
  const { star, onPress } = props;
  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity
        style={styles.bookContainer}
        onPress={onPress}
      >
        <View style={styles.bookInnerContainer}>
          <View style={styles.imageContainer}>
            <ImageBackground
              style={styles.starImage}
              source={{
                uri: star.user.avatar_photo.thumbnail_url,
              }}
            >
            </ImageBackground>
        </View>
          <Text style={styles.text}>
            <Text>Book</Text>
            <Text style={{ fontWeight: 'bold' }}>
              {star.nickname
                ? ` ${star.user.nickname} `
                : ` ${star.user.first_name} `
              }
            </Text>
            <Text>for $</Text>
            <Text style={{ fontWeight: 'bold' }}>
              {getStarBookingPriceFromStar(star)}
            </Text>
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default BookFooter;

const styles = {
  bookContainer: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  bookInnerContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  imageContainer: {
    height: 50,
    width: 50,
    backgroundColor: '#fff',
    borderWidth: 0,
    borderRadius: 90,
    overflow: 'hidden',
    padding: 5,
    alignSelf: 'center',
    marginRight: 12,
  },
  starImage: {
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'transparent',
  },
  text: {
    color: 'white',
    fontSize: 22,
    fontFamily: 'gilroy',
    alignSelf: 'center',
  },
};
