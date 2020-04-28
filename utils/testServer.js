/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const supertest = require('supertest');

const testServer = (route) => {
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  route(app);
  return supertest(app);
};

module.exports = testServer;
