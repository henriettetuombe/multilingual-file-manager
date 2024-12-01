const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./router/routes');
const userRouter = require('./router/UserRouter');
const mongoose = require('mongoose');
const i18next = require('i18next');
const i18nextMiddleware = require('i18next-express-middleware');
const Backend = require('i18next-fs-backend');
const middleware = require('i18next-http-middleware');
const path = require('path');

const app = express();
app.use(bodyParser.json());

// Initialize i18next
i18next
  .use(Backend)
  .use(middleware.LanguageDetector)
  .init({
    fallbackLng: 'en',
    backend: {
      loadPath: path.join(__dirname, '/locales/{{lng}}/translation.json'),
    },
  });

app.use(i18nextMiddleware.handle(i18next));

// Routes
app.use('/user', userRouter);
app.use('/api', routes);

// Base Route
app.post('/translate', (req, res) => {
    const { message } = req.body; // Input message from request body
    const translatedMessage = req.t(message); // Translate the message
    res.json({ message: translatedMessage });
});

// MongoDB Connection
mongoose
  .connect('mongodb://localhost:27017', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Database connection successful!');
  })
  .catch((error) => {
    console.error('Database connection failed:', error.message);
  });

// Start the Server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
