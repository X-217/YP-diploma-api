const express = require('express');
const helmet = require("helmet");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const routes = require('./routes');
const limiter = require('./configs/ratelimiter');

const errorHandler = require('./middlewares/errorHandler.js');
const {requestLogger, errorLogger} = require('./middlewares/logger');
const {MONGODB_URI, MONGODB_OPTIONS, PORT} = require('./config');

const app = express();

mongoose.connect(MONGODB_URI, MONGODB_OPTIONS);

app.use(limiter);
app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(requestLogger);
app.use(routes);
app.use(errorLogger);
app.use(errorHandler);

app.listen(PORT);

