import React from 'react';
import { Text, StyleSheet, View, ImageBackground, TouchableWithoutFeedback, Alert } from 'react-native';
import { withNavigation } from 'react-navigation';
import InputSpinner from 'react-native-input-spinner';
import InnerButton from '../common/InnerButton';
import * as api from '../../services/api';

class SignUpActivity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      totGuests: 1,
      signedUp: false,
      remainingSeats: props.activity.attributes.remaining_capacity,
    };
  }

  handleReservar() {
    const { totGuests, remainingSeats } = this.state
    const { activity } = this.props
    const fixedTotGuests = totGuests
    api.post(
      '/activity_reservation',
      { activity: activity.id,
        totGuests: totGuests,
      }
    ).then((response) => {
      console.log(response.data.data, '<-- received from API');
      this.setState({
        remainingSeats: remainingSeats - fixedTotGuests,
        totGuests: 1
      });
      Alert.alert(
        'Confirmación Reserva',
        `Ha reservado ${fixedTotGuests} cupo(s) para esta Actividad`,
        [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ],
        { cancelable: false }
      );
    }).catch((error) => {
      console.log(error);
      Alert.alert(
        'Error al Confirmar Reserva',
        '',
        [
          { text: 'OK' },
        ],
        { cancelable: false }
      );
    });
  }

  render() {
    const { activity } = this.props
    const { remainingSeats, totGuests } = this.state
    return (
      <View style={styles.containerStyle}>
        <View style={styles.innerContainerStyle}>
          <View style={styles.dataContainerStyle}>
            <View style={styles.textContainerStyle}>
              <Text>
                Capacidad Máxima:
                {activity.attributes.max_capacity}
              </Text>
              <Text>
                Capacidad Disponible:
                {remainingSeats}
              </Text>
              <InputSpinner
                style={{ marginTop: 10 }}
                max={remainingSeats}
                min={1}
                rounded={false}
                showBorder
                color="#2e78b7"
                value={totGuests}
                onChange={(num) => { this.setState({ totGuests: num }); }}
              />
            </View>
            <View style={styles.priceContainerStyle}>
              <Text style={styles.priceText}>
                S/.
                {activity.attributes.price_per_person}
              </Text>
              <Text style={styles.labelPriceText}>
                por persona
              </Text>
              <View style={styles.buttonContainerStyle}>
                <InnerButton
                  disabled
                  onPress={() => this.handleReservar()}
                >
                  Reservar
                </InnerButton>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    width: '95%',
    backgroundColor: '#eee',
    alignSelf: 'center',
    borderColor: '#2e78b7',
    borderWidth: 1,
    marginTop: 20,
  },
  innerContainerStyle: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 5,
    marginBottom: 5,
    marginRight: 5,
    marginLeft: 5,
  },
  dataContainerStyle: {
    flex: 1,
    flexDirection: 'row',
  },
  textContainerStyle: {
    flex: 0.7,
    flexDirection: 'column',
  },
  priceContainerStyle: {
    flex: 0.3,
  },
  priceText: {
    alignSelf: 'center',
    fontSize: 18,
  },
  labelPriceText: {
    alignSelf: 'center',
    marginBottom: 5,
  },
  buttonContainerStyle: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  responsibleUserTitle: {
    marginTop: 5,
    marginBottom: 5,
    fontSize: 14,
    fontFamily: 'gilroy',
  },
  titleText: {
    color: "#fff",
    fontSize: 40,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  }
});

export default withNavigation(SignUpActivity);
