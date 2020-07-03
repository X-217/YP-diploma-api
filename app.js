const express = require('express');
const helmet = require("helmet");
const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const routes = require('./routes');
const errorHandler = require('./middlewares/errorHandler.js');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { Forbidden } = require('./errors/http-errors');
const messages = require('./messages/messages_ru.json');

const app = express();
const PORT = process.env.PORT || 3000;
const mongoDb = {
  site: process.env.DB_HOST || 'localhost',
  port: process.env.MONGODB_URI || '27017',
  name: 'newsdb',
};
const startDatabase = async () => {
  try {
    await mongoose.connect(`mongodb://${mongoDb.site}:${mongoDb.port}/${mongoDb.name}`, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
  } catch (err) {

  }
};
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});

app.use(helmet());
app.use(limiter);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(requestLogger);
app.use(routes);
app.all('*', () => { throw new Forbidden(messages.forbidden); });
app.use(errorLogger);
app.use(errorHandler);

startDatabase()
  .then(app.listen(PORT))
  .catch();
