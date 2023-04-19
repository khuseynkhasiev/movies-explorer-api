const { Error } = require('mongoose');
const { NotFoundErrorCode } = require('../constans');

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = NotFoundErrorCode;
  }
}
module.exports = NotFoundError;
