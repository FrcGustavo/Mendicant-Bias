const jwt = require('jsonwebtoken');
const config = require('../../config');

const authenticateJwt = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ').pop();
    const payload = jwt.verify(token, config.authJwtSecret);
    req.payload = payload;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authenticateJwt;
