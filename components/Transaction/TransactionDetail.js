import React from 'react';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';
import * as api from '../../services/api';
import deviceStorage from '../../services/deviceStorage';

const editTransaction = (transaction, getNavigate) => {
  console.log('Redirect to edit transaction', transaction)
  getNavigate.navigate('TransactionsEdit', {transaction: transaction});
}

const destroyTransaction = (transaction, getNavigate) => {
  console.log(transaction)

  api.destroy(`transactions/${transaction.id}`)
      .then((response) => {
        deviceStorage.saveKey('currentUser', JSON.stringify(response.data.data));
        getNavigate.navigate('Transactions', response);
      }).catch((error) => {
        console.log(error);
      });
}

const TransactionDetail = (props) => {
  const { transaction, getNavigate } = props;
  console.log(transaction, "<== PROPS by Transaction Detail")
  return (
    <View
      style={styles.container}
    >
      <View style={styles.textContainer}>

        <Text style={styles.searchResultName} >
          Order ID: {transaction.id}
        </Text>

        <Text style={styles.searchResultGroup}>
          {transaction.attributes.vendor.name}
        </Text>

        <Text style={styles.searchResultName} >
          {transaction.attributes.type_transfer}: {transaction.attributes.created_at}
        </Text>

        <Text style={styles.searchResultName} >
          Closing Balance: {transaction.attributes.after_balance}
        </Text>
      </View>

      <View style={styles.actionsContainer}>
        <Text
          style={
            {
              color: transaction.attributes.type_transfer == 'user_addition'? 'green' : 'red',
              fontSize: 20,
              fontWeight: 'bold'
            }
          }
        >
        {transaction.attributes.reward}
        </Text>
      </View>
    </View>
  );
};

export default TransactionDetail;

const styles = StyleSheet.create({
  container: {
    height: 120,
    alignItems: 'center',
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingLeft: 5,
    paddingBottom: 10,
    marginBottom: 10,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
  },
  textReward:{
    color: 'green',
    fontWeight: 'bold',
    fontSize: 20,
  },
  actionsContainer: {
    flex: 0.4,
    alignItems: 'flex-end',
    backgroundColor: '#fff',
    padding: 30,
  },
  btnEdit: {
    flex: 0.5,
  },
  btnDestroy: {
    flex: 0.5,
  },
  textContainer: {
    flex: 0.6,
    backgroundColor: '#fff',
    borderColor: '#ccc',
    padding: 5,
  },
  searchResultName: {
    fontSize: 14,
    fontFamily: 'gilroy',
    textAlign: 'left',
    fontWeight: 'bold',
    color: '#B3B3B3'
  },
  searchResultGroup: {
    color: '#737373',
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'gilroy',
    textTransform: 'capitalize'
  }
});
