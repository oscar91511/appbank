const express = require('express');
const cors = require('cors');
const globalErrorHandler = require('./controllers/error.controller');
const AppError = require('./utils/appError');
const usersRoute = require('./routes/users.routes');
const morgan = require('morgan');

const app = express();

app.use(express.json());
app.use(cors());
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use('/api/v1/users', usersRoute);

app.all('*', (req, res, next) => {
  return next(
    new AppError(`Can't find ${req.originalUrl} on this server! 🧨🧨🧨, 404`)
  );
});

app.use(globalErrorHandler);

module.exports = app;
