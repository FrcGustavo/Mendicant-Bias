/* eslint-disable max-classes-per-file */
class NotFoundError extends Error {
  constructor(message = 'not found', status = 404) {
    super(message);
    this.name = 'Not Found';
    this.status = status;
  }
}

class FieldsRequiredError extends Error {
  constructor(message = 'the field is required', status = 202) {
    super(message);
    this.name = 'Fields Required Error';
    this.status = status;
  }
}

module.exports = {
  NotFoundError,
  FieldsRequiredError,
};
