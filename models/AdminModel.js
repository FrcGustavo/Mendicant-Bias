const mongoose = require('mongoose');

const { Schema } = mongoose;

const adminSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  cover: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  last_login: {
    type: Date,
    default: new Date(),
  },
}, {
  timestamps: true,
});

const Admin = mongoose.model('admins', adminSchema);

module.exports = Admin;
