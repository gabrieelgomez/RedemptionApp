import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import SearchResultDetail from './SearchResultDetail';

const renderResults = props => props.results.map((item) => {
  console.log(item.attributes, '<-- Cada item');
  if (item.attributes.app_image && item.attributes.name) {
    return (
      <TouchableOpacity
        key={item.attributes.id}
        onPress={() => props.onPress(item.attributes.id)}
      >
        <SearchResultDetail
          item={item.attributes}
          style={{ marginBottom: 10 }}
        />
      </TouchableOpacity>
    );
  }
});

const SearchResultList = props => (
  <View style={styles.container}>
    <Text style={styles.sectionTitle}>
      Resultados
    </Text>
    {renderResults(props)}
  </View>
);

export default SearchResultList;

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
});
