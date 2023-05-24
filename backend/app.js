/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const { createUser, login } = require('./controllers/users');
const router = require('./routes');
const errorsHandler = require('./middlewares/errorHandler');
const { validateLoginData, validateRegisterData } = require('./utils/validators/userValidator');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);
app.use(cors());

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', validateLoginData, login);
app.post('/signup', validateRegisterData, createUser);
app.use(router);

app.use(errorLogger);
app.use(errors());
app.use(errorsHandler);

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('start server');
});
