import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Platform,
} from 'react-native';

const FeaturedActivityDetail = (props) => {
  const { activity } = props;
  return (
    <View
      style={styles.container}
    >
      <View style={styles.shadowContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: activity.app_image,
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
          {activity.name}
        </Text>
        <Text
          style={styles.searchResultName}
        >
          {activity.name}
        </Text>
        <Text
          style={styles.searchResultPrice}
        >
          {activity.activity_type}
        </Text>
      </View>
    </View>
  );
};

export default FeaturedActivityDetail;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flexDirection: 'column',
    paddingLeft: 5,
    paddingBottom: 10,
  },
  imageContainer: {
    height: 80,
    width: 80,
    backgroundColor: '#fff',
    borderWidth: 0,
    borderRadius: 80,
    borderColor: '#fff',
    overflow: 'hidden',
    marginBottom: 5,
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
    backgroundColor: 'transparent',
  },
  textContainer: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#ccc',
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
