import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
} from 'react-native';
import { getStarBookingPriceFromList } from '../../lib/pricing';

const FeaturedCategoryStarDetail = (props) => {
  const { star } = props;
  return (
    <View
      style={styles.container}
    >
      <View style={styles.shadowContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: star.avatar_photo.thumbnail_url,
              cache: 'force-cache',
            }}
            style={styles.image}
          />
        </View>
      </View>
      <View style={styles.textContainer}>
        <Text
          style={styles.searchResultGroup}
        >
          {star.celebrity_profession[0].title}
        </Text>
        <Text
          style={styles.searchResultName}
        >
          {star.get_short_name}
        </Text>
        <Text
          style={styles.searchResultPrice}
        >
          $
          { getStarBookingPriceFromList(star) }
        </Text>
      </View>
    </View>
  );
};

export default FeaturedCategoryStarDetail;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: '#fff',
    flexDirection: 'column',
  },
  imageContainer: {
    height: 110,
    width: 110,
    borderWidth: 0,
    borderRadius: 80,
    borderColor: 'black',
    marginBottom: 5,
    overflow: 'hidden',
  },
  shadowContainer: {
    shadowColor: 'black',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  image: {
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  textContainer: {
    borderTopWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    padding: 5,
    alignItems: 'center',
  },
  searchResultName: {
    fontWeight: 'bold',
    fontSize: 12,
    fontFamily: 'gilroy',
  },
  searchResultGroup: {
    fontSize: 9,
    fontFamily: 'gilroy',
  },
  searchResultPrice: {
    fontSize: 10,
    fontFamily: 'gilroy',
  },
});
