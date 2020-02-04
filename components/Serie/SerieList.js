import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import SerieDetail from './SerieDetail';

const renderSeries = props => props.series.map((serie) => {
  return (
    <TouchableOpacity
      key={serie.id}
      onPress={() => props.handlePressSerie(serie.id)}
    >
      <SerieDetail
        serie={serie}
      />
    </TouchableOpacity>
  );
});

const SerieList = props => (
  <View style={styles.listContainer}>
    {renderSeries(props)}
  </View>
);

export default SerieList;

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    justifyContent: 'center',
    position: 'relative',
    borderBottomWidth: 1,
    borderColor: '#bbb',
  },
  sectionTitle: {
    color: '#FF953C',
    fontSize: 12,
    fontFamily: 'gilroy',
  },
  listContainer: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    marginTop: 20,
  },
});
