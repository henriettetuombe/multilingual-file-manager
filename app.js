const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const app = express();
const i18next = require('i18next');
const i18nextMiddleware = require('i18next-express-middleware');
const Backend = require('i18next-node-fs-backend');

// Middlewares
app.use(bodyParser.json());

i18next.use(Backend).init({
  lng: 'en',
  backend: {
    loadPath: __dirname + '/locales/{{lng}}.json'
  }
});

app.use(i18nextMiddleware.handle(i18next));

app.get('/', (req, res) => {
  res.send('Welcome to the Multilingual File Manager Application!');
});

// Routes
app.use('/api', routes);

// Start the server
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = app;