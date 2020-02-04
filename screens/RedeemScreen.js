import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Alert,
  Modal,
} from 'react-native';
import { withNavigation } from 'react-navigation';
import Loading from '../components/common/Loading';
import Header from '../components/Header';
import Button from '../components/common/Button';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EditInput from '../components/common/EditInput';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import QRCode from 'react-native-qrcode';

class RedeemScreen extends React.Component {
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
      pointsQuantity: 0,
      pointsAfterRedeem: 0,
      pointsEquivalent: 0,
      disabledSendPoints: false,
      modalVisible: false,
    };
  }

  componentDidMount() {
    this.setState({
      loading: false,
    });
  }

  setPoints(value) {
    points = value.replace(/[^0-9]/g, '')

    const { balance, current_country_rate } = this.props.screenProps.currentUser.attributes;

    var afterBalance     = balance - points;
    var pointsEquivalent  = points / current_country_rate;

    if (afterBalance < 0) {
      afterBalance = 'Invalid Amount'

      this.setState({
        disabledSendPoints: true
      });

    }

    this.setState({
      pointsQuantity:     points,
      pointsAfterRedeem:  afterBalance,
      pointsEquivalent:   pointsEquivalent,
      disabledSendPoints: false
    });
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render() {
    const { screenProps } = this.props;
    const { loading, pointsQuantity, pointsAfterRedeem, pointsEquivalent, disabledSendPoints } = this.state;
    const { currentUser } = screenProps;

    if (loading) {
      return (
        <Loading size={'large'} />
      );
    }
    return (
      <View style={styles.container}>
        <Header
          title='Redeem Points'
          dark
        />
        <KeyboardAwareScrollView keyboardShouldPersistTaps='always'>
          <View style={styles.contents}>
            <View style={styles.section}>
              <EditInput
                label='Enter Points to Redeem'
                onChangeText={value => this.setPoints(value)}
                autoCapitalizeProp='words'
                keyboardType='number-pad'
              />
            </View>
            <Text>Points to send: {pointsQuantity}</Text>
            <Text>Points equivalents in current dollar: {pointsEquivalent}</Text>
            <Text>Points in your account: {currentUser.attributes.balance}</Text>
            <Text>Balance after redemption: {pointsAfterRedeem}</Text>
            <Text>Disabled: {disabledSendPoints}</Text>

            <View style={styles.buttonContainer}>
              <View style={{ flex: 1 }}>
                <Button
                  disabled={disabledSendPoints}
                  onPress={() => {
                    this.setModalVisible(!this.state.modalVisible);
                  }}
                >
                Redeem
                </Button>
              </View>
            </View>

          </View>


          <View>
            <Modal
              animationType="slide"
              transparent={false}
              visible={this.state.modalVisible}
              >
              <View style={styles.containerModal}>
                <View>
                  <View style={styles.containerTextModal}>
                    <Text style={styles.textModal}>Show below QR Code at checkout to redeem your points</Text>
                  </View>

                  <QRCode
                    value={{user: currentUser.attributes.email, amount: pointsQuantity, afterBalance: pointsAfterRedeem}}
                    size={350}
                    bgColor='#262659'
                    fgColor='white'/>


                  <View style={styles.buttonContainer}>
                    <View style={{ flex: 1 }}>
                      <Button
                        onPress={() => {
                          this.setModalVisible(!this.state.modalVisible);
                        }}>
                      Go Back
                      </Button>
                    </View>
                  </View>

                </View>
              </View>
            </Modal>
          </View>


          <View style={{ height: 300 }} />
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

export default withNavigation(RedeemScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 20,
    marginRight: 20,
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  contents: {
    flex: 0.9,
    justifyContent: 'flex-start',
    marginTop: 10,
  },
  section: {
    flex: 1,
    flexDirection: 'column',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    marginBottom: 10,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    width: '100%',
    height: 60,
  },
  containerModal: {
    padding: 50,
    alignItems: 'center',
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerTextModal: {
    margin: 15,
  },
  textModal: {
    fontSize: 15,
    color: '#737373',
    fontWeight: 'bold',
  },
});
