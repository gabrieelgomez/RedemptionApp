import React from 'react';
import { View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

function returnCircles(currentStep, totalSteps) {
  const circles = [];
  for (let i = 1; i < (totalSteps + 1); i++) {
    if (currentStep >= i) {
      circles.push(<FontAwesome key={i} name="circle" size={16} style={styles.iconStyle} />);
    } else {
      circles.push(<FontAwesome key={i} name="circle-o" size={16} style={styles.iconStyle} />);
    }
  }
  return circles;
}

const CircleSteps = (props) => {
  const { step, totalSteps } = props;
  return (
    <View style={styles.container}>
      {returnCircles(step, totalSteps)}
    </View>
  );
};

const styles = {
  container: {
    width: '30%',
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  iconStyle: {
    // alignSelf: 'center',
    color: '#ff6c58',
    padding: 4,
  },
};

export default CircleSteps;
