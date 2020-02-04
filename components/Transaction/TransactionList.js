import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Text,
} from 'react-native';
import TransactionDetail from './TransactionDetail';

const renderTransactions = props => props.transactions.map((transaction) => {
  return (
    <TransactionDetail
      key={transaction.id}
      transaction={transaction}
      getNavigate={props.getNavigate}
    />
  );
});

const TransactionList = props => (
  <ScrollView>
    <View style={styles.container}>
      <View style={styles.listContainer}>
        {renderTransactions(props)}
      </View>
    </View>
  </ScrollView>
);

export default TransactionList;

const styles = StyleSheet.create({
  sectionTitle: {
    color: '#FF953C',
    fontSize: 12,
    fontFamily: 'gilroy',
  },
  container: {
    paddingLeft: 8,
    paddingRight: 8,
  },
});
