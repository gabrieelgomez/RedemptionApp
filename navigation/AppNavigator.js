import { createAppContainer, createDrawerNavigator } from 'react-navigation';
import HomeStack from './HomeStack';
import MyRewardsStack from './MyRewardsStack';
import FaqStack from './FaqStack';
import TermsConditionsStack from './TermsConditionsStack';
import CollectorRulesStack from './CollectorRulesStack';
import PrivacyPolicyStack from './PrivacyPolicyStack';
import AboutUsStack from './AboutUsStack';
import ContactUsStack from './ContactUsStack';
import SideDrawer from '../screens/SideDrawer';

export default createAppContainer(createDrawerNavigator(
  {
    MyRewards: {
      screen: MyRewardsStack,
    },
    Home: {
      screen: HomeStack,
    },
    Faq: {
      screen: FaqStack,
    },
    TermsConditions: {
      screen: TermsConditionsStack,
    },
    CollectorRules: {
      screen: CollectorRulesStack,
    },
    PrivacyPolicy: {
      screen: PrivacyPolicyStack,
    },
    AboutUs: {
      screen: AboutUsStack,
    },
    ContactUs: {
      screen: ContactUsStack,
    },
  },
  {
    initialRouteName: 'MyRewards',
    contentComponent: SideDrawer,
    drawerPosition: 'left',
    drawerWidth: 200,
  },
));
