const { isCelebrate } = require('celebrate');

const errorHandler = (err, req, res, next) => {
  const statusCode = (isCelebrate(err) || (err.name === 'CastError') || err.name === ('ValidationError')) ? 400 : err.statusCode || 500;
  if (err.name === ('ValidationError')) { err.message = Object.values(err.errors).map((error) => error.message).join(', '); }
  res.status(statusCode).send({ message: statusCode === 500 ? 'На сервере произошла ошибка' : err.message });
  //  res.status(statusCode).send(err);
  next();
};

module.exports = errorHandler;
