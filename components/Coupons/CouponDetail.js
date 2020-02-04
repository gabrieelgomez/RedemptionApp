import React from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
} from 'react-native';
import { Card, CardItem, Thumbnail, Button, Icon, Left, Body, Right } from 'native-base';

const CouponDetail = (props) => {
  const { coupon, getNavigate } = props;
  console.log(coupon, "<== PROPS by Coupon Detail")
  return (
    <Card>
      <CardItem cardBody button onPress={() => alert("This is Card Image")}>
        <Image source={{uri: 'https://lh6.googleusercontent.com/proxy/AJkZPebxP9040-Z3l0LudH64lVx6BljoA_YZbpV_FGwtQbM5I-zVWGU87JFl9eN9dqK_TnAh_Vuz95QgvZA2xPrVSpyot16Ai1RU5oYmmI3GZkBAloiCDufJE5YWIsttgL0is_rlQ11eASx3enEE'}} style={{height: 150, width: null, flex: 1}}/>
      </CardItem>

      <CardItem button onPress={() => alert("This is Card Title")}>
        <Left>
          <Text>{coupon.attributes.name}</Text>
        </Left>
      </CardItem>

      <CardItem button onPress={() => alert("This is Card Coupon")} style={[{marginTop: -12}]}>
        <Left>
          <Text style={styles.titleContentCarousel} >Get {<Text style={{ textTransform: 'capitalize'}} >{coupon.attributes.coupon_type}</Text>} {coupon.attributes.name}</Text>
        </Left>
      </CardItem>

      <CardItem style={[{marginTop: -12}]}>
        <Left>
          <Text>Valid until {coupon.attributes.valid_till_date}</Text>
        </Left>
      </CardItem>

    </Card>
  );
};

export default CouponDetail;

const styles = StyleSheet.create({
  titleContentCarousel: {
    color:'#000',
    textTransform: 'capitalize',
  },
});
