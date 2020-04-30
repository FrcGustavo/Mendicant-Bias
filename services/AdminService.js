const bcrypt = require('bcrypt');
const Admin = require('../models/AdminModel');

async function create(admin) {
  let cover = '/';
  const {
    firstName,
    lastName,
    username,
    email,
    password,
  } = admin;

  if (!firstName || !lastName || !username || !email || !password) {
    throw new Error('data is incomplete');
  }

  if (!admin.cover) {
    cover = '/';
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const createdAdmin = await Admin.create({
    firstName,
    lastName,
    username,
    cover,
    email,
    password: hashedPassword,
  });
  return createdAdmin;
}
async function update(admin, adminId) {
  const updatedAdmin = await Admin.updateOne({ _id: adminId }, admin);
  return updatedAdmin;
}
async function findById(adminId) {
  const admin = await Admin.findById(adminId);
  return admin;
}

async function count() {
  const counted = await Admin.countDocuments();
  return counted;
}

async function findByEmail(email) {
  const admin = await Admin.findOne({ email });
  return admin;
}

module.exports = {
  create,
  update,
  findById,
  findByEmail,
  count,
};
