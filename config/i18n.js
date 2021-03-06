export const fallback = 'en';

export const supportedLocales = {
  en: {
    name: 'English',
    translationFileLoader: () => require('../lang/en.json'),

    // en is default locale in Moment
    momentLocaleLoader: () => Promise.resolve(),
  },
  es: {
    name: 'Spanish',
    translationFileLoader: () => require('../lang/es.json'),
    momentLocaleLoader: () => import('moment/locale/es'),
  },
};

export const defaultNamespace = 'common';

export const namespaces = [
  'common',
  'Auth',
  'HomeScreen',
  'Sidebar',
];
