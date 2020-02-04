import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Platform,
} from 'react-native';

const ActivityDetail = (props) => {
  const { activity } = props;
  const friendlyType = activity.attributes.activity_type.charAt(0).toUpperCase() + activity.attributes.activity_type.slice(1)
  const detailTitle = `${friendlyType}: ${activity.attributes.name}`;
  // console.log(activity, "<== PROPS by Activity Detail")
  return (
    <View
      style={styles.container}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: activity.attributes.image.medium.url,
            cache: 'force-cache',
          }}
          style={styles.image}
        />
      </View>
      <View style={styles.textContainer}>
        <Text
          style={styles.activityTitle}
        >
          {detailTitle}
        </Text>
        <Text
          style={styles.activityDescription}
        >
          {activity.attributes.description}
        </Text>
      </View>
    </View>
  );
};

export default ActivityDetail;

const styles = StyleSheet.create({
  container: {
    height: 120,
    alignItems: 'center',
    backgroundColor: '#fff',
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
  },
  searchResultName: {
    fontSize: 12,
    fontFamily: 'gilroy',
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'gilroy',
    marginBottom: 5,
  },
  activityDescription: {
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
