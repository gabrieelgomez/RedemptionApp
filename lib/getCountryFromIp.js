import axios from 'axios';

export default class getCountryFromIp {

  static async getCountryCode() {
    return await axios({
      method: 'GET',
      url: 'http://api.ipstack.com/check?access_key=d21d705acf541088d600464b030f0759&output=json',
      // headers: headers,
    })
  }

}
