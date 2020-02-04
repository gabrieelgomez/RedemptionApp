import * as Localization from 'expo-localization';

const languageDetector = {
  type: 'languageDetector',
  async: true,
  detect: callback => Localization.getLocalizationAsync()
    .then((lang) => {
      //callback(lang.locale);
      callback('en');
    }),
  init: () => {},
  cacheUserLanguage: () => {},
};

export default languageDetector;
