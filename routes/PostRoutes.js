const express = require('express');
const controller = require('../controllers/PostsController');
const authenticateJwt = require('../utils/middlewares/authenticateJwt');

const postRoutes = (app) => {
  const router = express.Router();
  app.use('/api/posts', router);

  router.route('/')
    .get(controller.index)
    .post(authenticateJwt, controller.create);
  router.route('/:slug')
    .get(controller.show)
    .patch(authenticateJwt, controller.update)
    .delete(authenticateJwt, controller.destroy);
};

module.exports = postRoutes;
