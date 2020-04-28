const jwt = require('jsonwebtoken');
const AdminService = require('../../services/AdminService');
const config = require('../../config');

const authenticateJwtAdmin = async (req, res, next) => {
  try {
    const admin = await AdminService.count();
    if (admin > 0) {
      const token = req.headers.authorization.split(' ').pop();
      const payload = jwt.verify(token, config.authJwtSecret);
      req.payload = payload;
      next();
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authenticateJwtAdmin;
