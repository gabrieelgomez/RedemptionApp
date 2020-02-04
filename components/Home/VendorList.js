import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import VendorDetail from './VendorDetail';

const renderVendors = props => props.vendors.map((vendor) => {
  console.log(props, '<= Props')
  return (
    <TouchableOpacity
      key={vendor.id}
      onPress={() => props.handlePressVendor(vendor.id)}
    >
      <VendorDetail
        vendor={vendor}
      />
    </TouchableOpacity>
  );
});

const VendorList = props => (
  <View style={styles.container}>
    <View style={styles.listContainer}>
      {renderVendors(props)}
    </View>
  </View>
);

export default VendorList;

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
