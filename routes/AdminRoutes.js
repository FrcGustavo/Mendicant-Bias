const express = require('express');
const controller = require('../controllers/AdminController');
const authenticateJwt = require('../utils/middlewares/authenticateJwt');
const authenticateJwtAdmin = require('../utils/middlewares/authenticateJwtAdmin');

const AdminRoutes = (app) => {
  const router = express.Router();
  app.use('/api/admin', router);

  router.route('/')
    .post(authenticateJwtAdmin, controller.create);
  router.route('/:id')
    .get(authenticateJwt, controller.show)
    .patch(authenticateJwt, controller.update);
};

module.exports = AdminRoutes;
