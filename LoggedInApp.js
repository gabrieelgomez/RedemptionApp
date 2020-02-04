import React from 'react';
import { AppLoading } from 'expo';
import * as Icon from '@expo/vector-icons';
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';
import AppNavigator from './navigation/AppNavigator';
import { t } from './services/i18n';

class LoggedInApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeCategory: 'Featured',
      menuCategoryItems: [],
      loading: false,
    };
  }

  componentDidMount() {
    this.generatemenuCategoryItems();
  }

  generatemenuCategoryItems() {
    const newData = [
      { id: 0, title: 'Inicio', screen: 'Home' },
      { id: 1, title: 'FAQ', screen: 'Faq' },
      { id: 2, title: t('Sidebar:terms_and_conditions'), screen: 'TermsConditions' },
      { id: 3, title: 'Collector Rules', screen: 'CollectorRules' },
      { id: 4, title: 'Privacy Policy', screen: 'PrivacyPolicy' },
      { id: 5, title: 'About Us', screen: 'AboutUs' },
      { id: 6, title: 'Contact Us', screen: 'ContactUs' },
    ];
    this.setState({
      menuCategoryItems: newData,
    });
  }

  render() {
    const { activeCategory, menuCategoryItems } = this.state;
    const { logoutAuthToken, currentUser, setCurrentUser } = this.props.screenProps;
    return (
      <AppNavigator screenProps={{
        logoutAuthToken,
        currentUser,
        activeCategory,
        menuCategoryItems,
        setCurrentUser,
      }}
      />
    );
  }
}

export default LoggedInApp;
