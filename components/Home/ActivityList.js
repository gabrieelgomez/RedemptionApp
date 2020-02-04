import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import ActivityDetail from './ActivityDetail';

const renderActivities = props => props.activities.map((activity) => {
  console.log(props, '<= Props')
  return (
    <TouchableOpacity
      key={activity.id}
      onPress={() => props.handlePressActivity(activity.id)}
    >
      <ActivityDetail
        activity={activity}
      />
    </TouchableOpacity>
  );
});

const ActivityList = props => (
  <View style={styles.container}>
    <View style={styles.listContainer}>
      {renderActivities(props)}
    </View>
  </View>
);

export default ActivityList;

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
