import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import FeaturedActivityDetail from './FeaturedActivityDetail';

const renderActivities = props => props.activities.map((activity) => {
  return (
    <TouchableOpacity
      key={activity.id}
      onPress={() => props.onPress(activity.id)}
    >
      <FeaturedActivityDetail
        activity={activity}
      />
    </TouchableOpacity>
  );
});

const FeaturedActivityList = props => (
  <View style={styles.container}>
    <View style={styles.listContainer}>
      {renderActivities(props)}
    </View>
  </View>
);

export default FeaturedActivityList;

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
