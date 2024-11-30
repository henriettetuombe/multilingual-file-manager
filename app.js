const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./router/routes');
const app = express();
const i18next = require('i18next');
const i18nextMiddleware = require('i18next-express-middleware');
const Backend = require('i18next-node-fs-backend');
const userRouter = require('./router/UserRouter');
const { default: mongoose } = require('mongoose');
app.use(bodyParser.json());

i18next.use(Backend).init({
  lng: 'en',
  backend: {
    loadPath: __dirname + '/locales/{{lng}}.json'
  }
});

app.use(i18nextMiddleware.handle(i18next));


app.use('/user', userRouter);
app.use('/api', routes);

mongoose.connect("mongodb://localhost:27017").then(()=>{
  console.log("db is connected");
  
}).catch((error)=>{
  console.log("DB is not connected");
  
})
  const PORT =  3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

console.log("Hello, Nodemon!");

module.exports = app;