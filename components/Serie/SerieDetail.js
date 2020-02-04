import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Platform,
} from 'react-native';

const SerieDetail = (props) => {
  const { serie } = props;
  return (
    <View
      style={styles.container}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: serie.attributes.image.medium.url,
            cache: 'force-cache',
          }}
          style={styles.image}
        />
      </View>
      <View style={styles.textContainer}>
        <Text
          style={styles.serieType}
        >
          {serie.attributes.serie_type}
        </Text>
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
      </View>
    </View>
  );
};

export default SerieDetail;

const styles = StyleSheet.create({
  container: {
    height: 120,
    alignItems: 'center',
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingLeft: 5,
    paddingBottom: 10,
    borderTopWidth: 1,
    borderColor: '#bbb',
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
    borderTopWidth: 0,
    borderColor: '#ccc',
    padding: 5,
    // alignItems: 'center',
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
  serieType: {
    fontSize: 12,
    fontFamily: 'gilroy',
    fontWeight: 'bold',
    marginBottom: 10,
    textTransform: 'uppercase',
  },
});
