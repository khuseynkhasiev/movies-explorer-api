const { Error } = require('mongoose');
const { ConflictErrorCode } = require('../constans');

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ConflictErrorCode;
  }
}
module.exports = ConflictError;
