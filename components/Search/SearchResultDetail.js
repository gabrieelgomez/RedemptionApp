import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
} from 'react-native';

const SearchResultDetail = (props) => {
  const { item } = props;
  return (
    <View
      style={styles.container}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: item.app_image,
            cache: 'force-cache',
          }}
          style={styles.image}
        />
      </View>
      <View style={styles.textContainer}>
        <Text
          style={styles.searchResultName}
        >
          {item.name}
        </Text>
        <Text
          style={styles.searchResultGroup}
        >
          {item.description}
        </Text>
      </View>
    </View>
  );
};

export default SearchResultDetail;

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    marginTop: 10,
    backgroundColor: '#fff',
    position: 'relative',
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  imageContainer: {
    marginLeft: 10,
    height: 50,
    width: 50,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderRadius: 80,
    borderColor: '#fff',
    overflow: 'hidden',
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
    padding: 10,
  },
  searchResultName: {
    fontWeight: 'bold',
  },
  searchResultGroup: {
    fontSize: 12,
    fontFamily: 'gilroy',
  },
});
