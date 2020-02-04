import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import FeaturedCategoryStarDetail from './FeaturedCategoryStarDetail';

const renderStars = props => props.stars.map((star) => {
  return (
    <TouchableOpacity
      key={star.id}
      onPress={() => props.onPress(star.id)}
    >
      <FeaturedCategoryStarDetail
        star={star}
      />
    </TouchableOpacity>
  );
});

const FeaturedCategoryStarList = props => (
  <View style={styles.container}>
    <View style={styles.listContainer}>
      {renderStars(props)}
    </View>
  </View>
);

export default FeaturedCategoryStarList;

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    justifyContent: 'center',
    position: 'relative',
  },
  sectionTitle: {
    color: '#FF953C',
    fontSize: 12,
    fontFamily: 'gilroy',
  },
  listContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 10,
  },
});
