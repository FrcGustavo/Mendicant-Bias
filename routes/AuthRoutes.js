const express = require('express');
const controller = require('../controllers/AuthController');

const AuthRoutes = (app) => {
  const router = express.Router();
  app.use('/api/auth', router);
  router.get('/', controller.signIn);
};

module.exports = AuthRoutes;
