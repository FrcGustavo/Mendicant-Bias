/* eslint-disable no-undef */
/* eslint-disable no-underscore-dangle */
const assert = require('assert');
const proxyquire = require('proxyquire');
const { AdminServiceMock, AdminMock } = require('../utils/mocks/AdminMock');
const testServer = require('../utils/testServer');

describe('routes - admin', () => {
  const controller = proxyquire('../controllers/AdminController', {
    '../services/AdminService': AdminServiceMock,
  });
  const route = proxyquire('../routes/AdminRoutes', {
    '../controllers/AdminController': controller,
  });

  const request = testServer(route);

  describe('GET /admin/:id', () => {
    it('should response with status code 200', (done) => {
      request.get(`/api/admin/${AdminMock[0]._id}`).expect(200, done);
    });
    it('should response with a admin', (done) => {
      request.get(`/api/admin/${AdminMock[0]._id}`)
        .end((eroor, res) => {
          assert.deepEqual(res.body, {
            message: 'admin ready',
            data: AdminMock[0],
          });
          done();
        });
    });
  });

  describe('POST /admin', () => {
    it('should response with status code 201', (done) => {
      request.post('/api/admin')
        .set('Content-Type', 'appication/json')
        .send(AdminMock[0])
        .expect(201, done);
    });
    it('should response with new admin', (done) => {
      request.post('/api/admin')
        .set('Content-Type', 'appication/json')
        .send(AdminMock[0])
        .end((error, res) => {
          assert.deepEqual(res.body, {
            message: 'admin created',
            data: AdminMock[0],
          });
          done();
        });
    });
  });

  describe('PATCH /admin/:id', () => {
    it('should response with status code 200', (done) => {
      request.patch(`/api/admin/${AdminMock[0]._id}`)
        .set('Content-Type', 'appication/json')
        .send(AdminMock[0])
        .expect(200, done);
    });
    it('should response with admin updated', (done) => {
      request.patch(`/api/admin/${AdminMock[0]._id}`)
        .set('Content-Type', 'appication/json')
        .send(AdminMock[0])
        .end((error, res) => {
          assert.deepEqual(res.body, {
            message: 'admin updated',
            data: AdminMock[0],
          });
          done();
        });
    });
  });
});
