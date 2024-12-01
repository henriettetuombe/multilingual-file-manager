const i18next = require('i18next');
const i18nextMiddleware = require('i18next-http-middleware');
const Backend = require('i18next-fs-backend');
const path = require('path');

i18next
  .use(Backend)
  .use(i18nextMiddleware.LanguageDetector)
  .init({
    fallbackLng: 'en', // Default language
    preload: ['en', 'fr'], // Load these languages
    backend: {
      loadPath: path.join(__dirname, '/locales/{{lng}}/translation.json'),
    },
    detection: {
      order: ['querystring', 'header'], // Query parameter first, then headers
      caches: false,
    },
  });
