const { Error } = require('mongoose');
const { UnauthorizedErrorCode } = require('../constans');

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = UnauthorizedErrorCode;
  }
}
module.exports = UnauthorizedError;
