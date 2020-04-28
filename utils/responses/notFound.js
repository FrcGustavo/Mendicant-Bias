/**
 *
 * @param {response} res
 * @param {String} message
 * @param {Object} data
 * @param {Number} status
 */
const success = (res, message = 'Your request is success', data = false, status = 400) => {
  res
    .status(status)
    .json({ status, message, data });
};

module.exports = success;
