const { Error } = require('mongoose');
const { UnaccurateDateErrorCode } = require('../constans');

class UnaccurateDateError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = UnaccurateDateErrorCode;
  }
}
module.exports = UnaccurateDateError;
