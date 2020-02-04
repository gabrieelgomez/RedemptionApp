import React, { Component } from 'react';
import QRCode from 'react-native-qrcode';
import Button from '../common/Button';
import { StyleSheet, View, Modal, Text } from 'react-native';

export default class QRBarCode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: 'Show this QR Code to receive points',
      modalVisible: false,
    };
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render() {
    const { currentUser } = this.props;

    return (
      <View style={styles.containerQR}>
        <View style={styles.container}>
          <Text
            style={styles.input}
            onPress={() => {
              this.setModalVisible(!this.state.modalVisible);
            }}>
          {this.state.text}
          </Text>
        </View>

        <View>
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.modalVisible}
            >
            <View style={styles.containerModal}>
              <View>
                <QRCode
                  value={{user: currentUser.attributes.email, loyaltyId: currentUser.id}}
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

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 5,
  },
  containerModal: {
    padding: 50,
    alignItems: 'center',
  },
  input: {
    borderColor: 'gray',
    borderWidth: 2,
    borderRadius: 5,
    padding: 5,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerQR:{
    borderBottomColor: '#262659',
    borderBottomWidth: 1,
    marginTop: 5,
    marginBottom: 5,
  }
});
