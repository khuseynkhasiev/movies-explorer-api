const { Error } = require('mongoose');
const { ForbiddenErrorCode } = require('../constans');

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ForbiddenErrorCode;
  }
}
module.exports = ForbiddenError;
