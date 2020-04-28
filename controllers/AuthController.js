/* eslint-disable no-underscore-dangle */
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../config');
const AdminService = require('../services/AdminService');

async function signIn(req, res, next) {
  const { email, password } = req.body;
  try {
    const admin = await AdminService.findByEmail(email);
    if (!admin) throw new Error('Error email dont exist');
    if (!await bcrypt.compare(password, admin.password)) {
      throw new Error('Error');
    }
    delete admin.password;
    const payload = {
      _sub: admin._id,
      email: admin.email,
      username: admin.username,
    };
    const token = jwt.sign(payload, config.authJwtSecret, {
      expiresIn: '59min',
    });
    res.status(200).json({
      message: 'user sign in',
      token,
      admin,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  signIn,
};
