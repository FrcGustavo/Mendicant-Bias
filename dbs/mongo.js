/* eslint-disable no-console */
/* eslint-disable max-len */
const mongoose = require('mongoose');
const config = require('../config');

const connectMongo = async () => {
  const PASSWORD = encodeURIComponent(config.db.password);
  const USER = encodeURIComponent(config.db.user);
  const DB_NAME = config.db.name;
  const mongoUri = `mongodb+srv://${USER}:${PASSWORD}@${config.db.host}/${DB_NAME}?retryWrites=true&w=majority`;
  try {
    await mongoose.connect(mongoUri, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true });
    return console.log('Connection to mongo is ready');
  } catch (error) {
    return process.exit(1);
  }
};

module.exports = connectMongo;
