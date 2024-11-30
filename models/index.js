'use strict';

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');


const app = express();


app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: false })); 


app.get('/', (req, res) => {
  res.status(200).json({ message: 'Server is running!' });
});


app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

