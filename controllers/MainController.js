/* eslint-disable class-methods-use-this */
class MainController {
  success(res, message, data, status) {
    res.status(status).json({ status, message, data });
  }

  notFound(res, message, data, status) {
    res.status(status).json({ status, message, data });
  }
}

module.exports = MainController;
