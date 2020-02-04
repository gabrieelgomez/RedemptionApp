import React from 'react';
import {
  ScrollView, View, Text, StyleSheet, Image,
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import LogoImage from '../assets/images/header_logo.png';

function navigateToScreen(props, route) {
  const { navigation } = props;
  const navigateAction = NavigationActions.navigate({
    routeName: route,
  });
  navigation.dispatch(navigateAction);
}

function mapmenuCategoryItems(props) {
  const { activeCategory, menuCategoryItems } = props.screenProps;
  return (
    menuCategoryItems.map(item => (
      <View
        key={item.id}
        style={activeCategory === item.title ? styles.navActiveViewStyle : styles.navViewStyle}
      >
        <Text
          style={activeCategory === item.title ? styles.navActiveItemStyle : styles.navItemStyle}
          onPress={() => navigateToScreen(props, item.screen)}
        >
          {item.title}
        </Text>
      </View>
    ))
  );
}

export default class SideDrawer extends React.Component {
  render() {
   const { navigation } = this.props
   return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.headerContainer}>
          <Image
            source={LogoImage}
            style={{
              width: '80%',
              height: 60,
              resizeMode: 'contain',
              alignSelf: 'center',
              marginBottom: 10,
            }}
          />
        </View>
        { mapmenuCategoryItems(this.props) }
      </ScrollView>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1,
    backgroundColor: 'white',
  },
  navItemStyle: {
    fontSize: 18,
    fontFamily: 'gilroy',
    color: 'grey',
  },
  navActiveItemStyle: {
    paddingLeft: 10,
    fontSize: 18,
    fontFamily: 'gilroy',
    color: '#262659',
  },
  navActiveViewStyle: {
    borderColor: '#262659',
    borderLeftWidth: 5,
    marginTop: 8,
    marginBottom: 8,
  },
  navViewStyle: {
    marginLeft: 15,
    marginTop: 8,
    marginBottom: 8,
  },
  navSectionStyle: {
    backgroundColor: 'lightgrey',
  },
  sectionHeadingStyle: {
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  footerContainer: {
    padding: 20,
    backgroundColor: 'lightgrey',
  },
});
