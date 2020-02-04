import { AsyncStorage, Platform } from 'react-native';
import axios from 'axios';
import deviceStorage from './deviceStorage';

export const get = (endpoint, payload = {}, headers = {}) => new Promise((resolve, reject) => {
  AsyncStorage.getItem('authToken', (err, authToken) => {
    const device = Platform.OS === 'ios' ? 'ios' : 'android';
    const version = Platform.OS === 'ios' ? '4.4' : '5.0.1';
    const headers = {
      'version': version,
      'device': device,
      'Authorization': `token ${authToken}`,
    }
    axios({
      method: 'GET',
      url: ENDPOINT_V2 + endpoint,
      headers,
      // data: payload,
    })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        console.log(error)
        reject(error);
      });
  });
});

export const post = (endpoint, payload = {}, headers = {}) => new Promise((resolve, reject) => {
  AsyncStorage.getItem('authToken', (err, authToken) => {
    const device = Platform.OS === 'ios' ? 'ios' : 'android';
    const version = Platform.OS === 'ios' ? '4.4' : '5.0.1';
    const headers = {
      'version': version,
      'device': device,
      'Authorization': `token ${authToken}`,
    }
    axios({
      method: 'POST',
      url: ENDPOINT_V2 + endpoint,
      headers: headers,
      data: payload,
    })
    .then((response) => {
      resolve(response);
    })
    .catch((error) => {
      reject(error);
   });
 });
});

export const put = (endpoint, payload = {}, headers = {}) => new Promise((resolve, reject) => {
  AsyncStorage.getItem('authToken', (err, authToken) => {
    const device = Platform.OS === 'ios' ? 'ios' : 'android';
    const version = Platform.OS === 'ios' ? '4.4' : '5.0.1';
    const headers = {
      'version': version,
      'device': device,
      'Authorization': `token ${authToken}`,
    }
    axios({
      method: 'PUT',
      url: ENDPOINT_V2 + endpoint,
      headers: headers,
      data: payload,
    })
    .then((response) => {
      resolve(response);
    })
    .catch((error) => {
      reject(error);
   });
 });
});

export const destroy = (endpoint, payload = {}, headers = {}) => new Promise((resolve, reject) => {
    AsyncStorage.getItem('authToken', (err, authToken) => {
      const device = Platform.OS === 'ios' ? 'ios' : 'android';
      const version = Platform.OS === 'ios' ? '4.4' : '5.0.1';
      const headers = {
        'version': version,
        'device': device,
        'Authorization': `token ${authToken}`,
      }
      axios({
        method: 'DELETE',
        url: ENDPOINT_V2 + endpoint,
        headers: headers,
      })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
     });
 });
});
