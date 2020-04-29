const Logs = {};

class LogsController {
  constructor() {
    this.logs = Logs;
  }

  async index(req, res, next) {
    const { page } = req.query;
    try {
      const logs = await this.logs.findAll(page);
      if (logs != null) {
        this.success(res, 'logs listed', logs, 200);
      } else {
        this.success(res, 'logs not found', logs, 404);
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = LogsController;
