const bcrypt = require('bcrypt');
const Admin = require('../models/AdminModel');

async function create(admin) {
  const {
    firstName,
    lastName,
    username,
    email,
    password,
  } = admin;

  if (!firstName || !lastName || !username || !email || !password) {
    throw 'data is incomplete';
  }

  if (!admin.cover) {
    admin.cover = '/';
  }

  const isEmailRegistered = await isRegisteredEmail(admin.email);
  if (isEmailRegistered) {
    throw 'Email is registered';
  }

  const isUsernameRegistered = await isRegisteredUsername(admin.username);
  if (isUsernameRegistered) {
    throw 'Username is registered';
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const createdAdmin = await Admin.create({
    firstName,
    lastName,
    username,
    cover: admin.cover,
    email,
    password: hashedPassword,
  });
  return createdAdmin;
}
async function update(admin, adminId) {
  console.log('ID', adminId);

  const updatedAdmin = await Admin.updateOne({ _id: adminId }, admin);
  return updatedAdmin;
}
async function findById(adminId) {
  const admin = await Admin.findById(adminId);
  return admin;
}

async function count() {
  return await Admin.countDocuments();
}

async function findByEmail(email) {
  return await Admin.findOne({ email });
}

async function isRegisteredEmail(email) {
  const user = await Admin.findOne({ email });
  if (user) return true;
  return false;
}

async function isRegisteredUsername(username) {
  const user = await Admin.findOne({ username });
  if (user) return true;
  return false;
}

module.exports = {
  create,
  update,
  findById,
  findByEmail,
  count,
};
