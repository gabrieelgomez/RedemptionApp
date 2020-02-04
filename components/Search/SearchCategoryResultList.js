import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import SearchCategoryResultDetail from './SearchCategoryResultDetail';

const renderCategories = props => props.categories.map((category) => {
  return (
    <TouchableOpacity
      key={category.id}
    >
      <SearchCategoryResultDetail
        category={category}
        onPress={() => props.onPress(category.id)}
      />
    </TouchableOpacity>
  );
});

const SearchCategoryResultList = props => (
  <View style={styles.container}>
    <Text style={styles.sectionTitle}>
      CATEGORIES
    </Text>
    <View style={styles.listContainer}>
      {renderCategories(props)}
    </View>
  </View>
);

export default SearchCategoryResultList;

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
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
});
