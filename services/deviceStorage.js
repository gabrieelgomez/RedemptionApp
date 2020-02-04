import { AsyncStorage } from 'react-native';

const deviceStorage = {

  async saveKey(key, value) {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.log(`AsyncStorage Error: ${error.message}`);
    }
  },

  async loadKey(key) {
    try {
      const value = await AsyncStorage.getItem(key);
      return value;
    } catch (error) {
      console.log(`AsyncStorage Error: ${error.message}`);
      return '';
    }
  },

  async loadAuthToken() {
    try {
      const value = await AsyncStorage.getItem('authToken');
      if (value !== null) {
        this.setState({
          authToken: value,
          loading: false,
        });
      } else {
        this.setState({
          loading: false,
        });
      }
    } catch (error) {
      console.log(`AsyncStorage Error: ${error.message}`);
    }
  },

  async loadCurrentUser() {
    try {
      const value = await AsyncStorage.getItem('currentUser');
      if (value !== null) {
        this.setState({
          currentUser: JSON.parse(value),
          loading: false,
        });
      } else {
        this.setState({
          loading: false,
        });
      }
    } catch (error) {
      console.log(`AsyncStorage Error: ${error.message}`);
    }
  },

  async deleteAuthToken() {
    try {
      await AsyncStorage.removeItem('authToken')
        .then(
          () => {
            this.setState({
              authToken: '',
            });
          },
        );
    } catch (error) {
      console.log(`AsyncStorage Error: ${error.message}`);
    }
  },
};

export default deviceStorage;
