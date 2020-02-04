import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Text,
} from 'react-native';
import CouponDetail from './CouponDetail';
import { Content } from 'native-base';

const renderCoupons = props => props.coupons.map((coupon) => {
  return (
    <CouponDetail
      key={coupon.id}
      coupon={coupon}
      getNavigate={props.getNavigate}
    />
  );
});

const CouponList = props => (
  <Content enableResetScrollToCoords>
    {renderCoupons(props)}
  </Content>
);

export default CouponList;

const styles = StyleSheet.create({

});
