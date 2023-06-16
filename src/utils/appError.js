class AppError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;
    this.status = `statusCode`.startsWith('4') ? 'error' : 'fail';
    this.isOperational = true;

    error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
