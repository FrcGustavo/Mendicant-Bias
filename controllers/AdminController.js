const Admin = require('../services/AdminService');

async function create(req, res, next) {
  const admin = req.body;
  try {
    const createdAdmin = await Admin.create(admin);
    res.status(201).json({
      message: 'admin created',
      data: createdAdmin,
    });
  } catch (error) {
    next(error);
  }
}
async function show(req, res, next) {
  const adminId = req.params.id;
  try {
    const admin = await Admin.findById(adminId);
    res.status(200).json({
      message: 'admin ready',
      data: admin,
    });
  } catch (error) {
    next(error);
  }
}
async function update(req, res, next) {
  const adminId = req.params.id;
  const admin = req.body;
  try {
    const updatedAdmin = await Admin.update(admin, adminId);
    res.status(200).json({
      message: 'admin updated',
      data: updatedAdmin,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  create,
  show,
  update,
};
