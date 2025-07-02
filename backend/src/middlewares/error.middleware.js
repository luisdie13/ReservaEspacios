const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;
  
  // Manejo de errores específicos de Sequelize
  if (err.name === 'SequelizeValidationError') {
    statusCode = 400;
    message = err.errors.map(e => e.message).join(', ');
  } else if (err.name === 'SequelizeUniqueConstraintError') {
    statusCode = 409;
    message = 'El recurso ya existe';
  } else if (err.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Token no válido';
  }
  
  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
  });
};

const notFound = (req, res, next) => {
  const error = new Error(`No encontrado - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// Export as named exports
export { errorHandler, notFound };