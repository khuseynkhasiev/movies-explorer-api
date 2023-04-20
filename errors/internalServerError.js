const { Error } = require('mongoose');
const { InternalServerErrorCode } = require('../constans');

class InternalServerError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = InternalServerErrorCode;
  }
}
module.exports = InternalServerError;
