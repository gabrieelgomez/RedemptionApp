import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Text,
} from 'react-native';
import OfferDetail from './OfferDetail';
import { Content } from 'native-base';

const renderOffers = props => props.offers.map((offer) => {
  return (
    <OfferDetail
      key={offer.id}
      offer={offer}
      getNavigate={props.getNavigate}
    />
  );
});

const OfferList = props => (
  <Content enableResetScrollToCoords>
    {renderOffers(props)}
  </Content>
);

export default OfferList;

const styles = StyleSheet.create({

});
