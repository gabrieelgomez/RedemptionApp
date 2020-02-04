import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import { Ionicons } from 'react-native-vector-icons';
import { withNavigation } from 'react-navigation';
import Loading from '../components/common/Loading';
import ResponsibleUserCard from '../components/common/ResponsibleUserCard';
import SignUpActivity from '../components/Activity/SignUpActivity';
import { friendlyApiDate } from '../lib/utils';
import * as api from '../services/api';

class ActivityDetailScreen extends React.Component {

  static navigationOptions = ({ navigation }) => ({
    headerLeft: <Ionicons
      style={{ height: 32 }}
      name='ios-arrow-round-back'
      size={35}
      onPress={() => navigation.goBack()}
    />,
    headerRight: '',
  });

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      activity: [],
      typingTimeout: 0,
      error: '',
    };
  }

  componentDidMount() {
    this.getActivity();
  }

  getActivity() {
    const { screenProps, navigation } = this.props;
    const { currentUser } = screenProps;
    const activityId = navigation.getParam('activityId', '')
    api.get(
      `/activities/${activityId}`,
    ).then((response) => {
      console.log(response.data.data, '<-- received single activity from API');
      const newData = response.data.data;
      this.setState({
        activity: newData,
        loading: false,
      });
    }).catch((error) => {
      console.log(error);
      this.setState({
        error: 'Error retrieving data',
        loading: false,
      });
    });
  }

  handlePressRegister = () => {
    console.log(`clicked register to activity`);
    const { navigation } = this.props;
    // navigation.navigate('IndCurso', { courseId: courseId });
  }

  render() {
    const { navigation } = this.props;
    const { loading, activity } = this.state;
    const singleDay = activity.attributes ? (activity.attributes.start_date === activity.attributes.end_date) : false;
    if (loading) {
      return (
        <Loading size={'large'} />
      );
    }
    return (
      <View style={styles.container}>
        <View style={styles.bannerContainer}>
          <Image
            source={{
              uri: activity.attributes.image.medium.url,
              cache: 'force-cache',
            }}
            style={styles.image}
          />
        </View>
        <View style={styles.innerContainer}>
          <Text
            style={styles.activityName}
          >
            {activity.attributes.name}
          </Text>
          <ScrollView style={styles.detailsContainer}>
            <View style={styles.datesContainer}>
              <View style={styles.initialDateContainer}>
                <Text
                  style={styles.activityName}
                >
                  { singleDay ? 'Fecha: ' : 'Inicio: ' }
                  {friendlyApiDate(activity.attributes.start_date)}
                </Text>
              </View>
              <View style={styles.endDateContainer}>
                <Text
                  style={styles.activityName}
                >
                  { !singleDay
                    && (
                      (activity.attributes.end_date ? 'Fin: ' : '')
                      + friendlyApiDate(activity.attributes.end_date)
                    )
                  }
                </Text>
              </View>
            </View>
            <Text
              style={styles.activityDescription}
            >
              {activity.attributes.description}
            </Text>
            <Text
              style={styles.activityLongDescription}
            >
              {activity.attributes.long_description}
            </Text>
            {activity.attributes.max_capacity
            && (
              <SignUpActivity
                activity={activity}
              />
            )
            }
            {activity.attributes.responsible_user
            && (
              <ResponsibleUserCard
                style={styles.activityResponsibleUser}
                intro='Mayor Información:'
                name={activity.attributes.responsible_user.name}
                image={activity.attributes.responsible_user.image.thumb.url}
                email={activity.attributes.responsible_user.email}
                phone={activity.attributes.responsible_user.phone}
              />
            )
            }
            <View style={{ height: 100 }} />
          </ScrollView>
        </View>
      </View>
    );
  }
}

export default withNavigation(ActivityDetailScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  bannerContainer: {
    backgroundColor: '#fff',
    marginTop: 10,
    height: 120,
  },
  innerContainer: {
    flex: 1,
    width: '95%',
    alignSelf: 'center',
  },
  datesContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  initialDateContainer: {
    flex: 0.5,
  },
  endDateContainer: {
    flex: 0.5,
  },
  detailsContainer: {
    backgroundColor: '#fff',
    marginTop: 10,
  },
  image: {
    resizeMode: 'cover',
    height: 120,
  },
  activityName: {
    marginTop: 10,
    marginBottom: 5,
    fontWeight: 'bold',
    fontSize: 18,
    fontFamily: 'gilroy',
  },
  activityDescription: {
    marginBottom: 10,
  },
  icon: {
    width: 24,
    height: 24,
  },
  sectionTitle: {
    color: '#FF953C',
  },
  homePageTitle: {
    color: '#262659',
    fontSize: 18,
    fontFamily: 'gilroy',
    marginLeft: 10,
  },
  homePageDescription: {
    marginTop: 8,
    color: '#615195',
    fontSize: 22,
    fontFamily: 'gilroy',
    alignSelf: 'center',
    textAlign: 'center',
  },
});
