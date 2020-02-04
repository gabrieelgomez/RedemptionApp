import React from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
} from 'react-native';
import { Card, CardItem, Thumbnail, Button, Icon, Left, Body, Right } from 'native-base';

const OfferDetail = (props) => {
  const { offer, getNavigate } = props;
  console.log(offer, "<== PROPS by Offer Detail")
  return (
    <Card>
      <CardItem cardBody button onPress={() => alert("This is Card Image")}>
        <Image source={{uri: 'https://lh6.googleusercontent.com/proxy/AJkZPebxP9040-Z3l0LudH64lVx6BljoA_YZbpV_FGwtQbM5I-zVWGU87JFl9eN9dqK_TnAh_Vuz95QgvZA2xPrVSpyot16Ai1RU5oYmmI3GZkBAloiCDufJE5YWIsttgL0is_rlQ11eASx3enEE'}} style={{height: 150, width: null, flex: 1}}/>
      </CardItem>

      <CardItem button onPress={() => alert("This is Card Title")}>
        <Left>
          <Text>{offer.attributes.vendor.name}</Text>
        </Left>
      </CardItem>

      <CardItem button onPress={() => alert("This is Card Offer")} style={[{marginTop: -12}]}>
        <Left>
          <Text style={styles.titleContentCarousel} >Shop for min B${offer.attributes.points} & earn {offer.attributes.max_points} Points at {offer.attributes.vendor.name}</Text>
        </Left>
      </CardItem>

      <CardItem style={[{marginTop: -12}]}>
        <Left>
          <Text>Valid until {offer.attributes.end_date}</Text>
        </Left>
      </CardItem>

    </Card>
  );
};

export default OfferDetail;

const styles = StyleSheet.create({
  titleContentCarousel: {
    color:'#000',
    textTransform: 'capitalize',
  },
});
