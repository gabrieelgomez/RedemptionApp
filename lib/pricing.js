import { Platform } from 'react-native';

export function getStarBookingPriceFromList(star) {
  return (Platform.OS === 'ios'
    ? star.celebrity_user.in_app_price : star.celebrity_user.rate);
}

export function getStarBookingPriceFromStar(star) {
  return (Platform.OS === 'ios'
    ? star.celebrity_details.in_app_price : star.celebrity_details.rate);
}
