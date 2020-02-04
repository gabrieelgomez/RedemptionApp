import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import EventDetail from './EventDetail';

const renderSeries = props => props.series.map((serie) => {
  return (
    <TouchableOpacity
      key={serie.id}
      onPress={() => props.onPress(serie.id)}
    >
      <SerieDetail
        serie={serie}
      />
    </TouchableOpacity>
  );
});

const EventList = props => (
  <View style={styles.container}>
    <View style={styles.listContainer}>
      {renderSeries(props)}
    </View>
  </View>
);

export default EventList;

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
    flexWrap: 'wrap',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 20,
  },
});
