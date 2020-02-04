import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Platform,
} from 'react-native';

const EventDetail = (props) => {
  const { serie } = props;
  console.log(serie, "<== PROPS by Serie Detail")
  return (
    <View
      style={styles.container}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: serie.attributes.image.thumb.url,
            cache: 'force-cache',
          }}
          style={styles.image}
        />
      </View>
      <View style={styles.textContainer}>
        <Text
          style={styles.searchResultGroup}
        >
          {serie.attributes.title}
        </Text>
        <Text
          style={styles.searchResultName}
        >
          {serie.attributes.description}
        </Text>
        <Text
          style={styles.searchResultPrice}
        >
          {serie.attributes.serie_type}
        </Text>
      </View>
    </View>
  );
};

export default EventDetail;

const styles = StyleSheet.create({
  container: {
    height: 120,
    alignItems: 'center',
    backgroundColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingLeft: 5,
    paddingBottom: 10,
  },
  imageContainer: {
    flex: 0.4,
    backgroundColor: '#fff',
    padding: 10,
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
    backgroundColor: 'transparent',
    flex: 1,
  },
  textContainer: {
    flex: 0.6,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#ccc',
    padding: 5,
    alignItems: 'center',
  },
  searchResultName: {
    fontSize: 12,
    fontFamily: 'gilroy',
  },
  searchResultGroup: {
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'gilroy',
  },
  searchResultPrice: {
    fontSize: 12,
    fontFamily: 'gilroy',
    fontWeight: 'bold',
    color: 'blue',
  },
});
