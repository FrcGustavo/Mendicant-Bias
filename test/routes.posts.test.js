/* eslint-disable no-undef */
const assert = require('assert');
const proxyquire = require('proxyquire');
const testServer = require('../utils/testServer');
const { PostsServiceMock, PostsMock } = require('../utils/mocks/PostsMock');

describe('routes - posts', () => {
  const controller = proxyquire('../controllers/PostsController', {
    '../services/PostsService': PostsServiceMock,
  });
  const route = proxyquire('../routes/posts', {
    '../controllers/PostsController': controller,
  });

  const request = testServer(route);

  describe('GET /posts', () => {
    it('should response with status code 200', (done) => {
      request.get('/api/posts').expect(200, done);
    });
    it('should response with a list of posts', (done) => {
      request.get('/api/posts').end((err, res) => {
        assert.deepEqual(res.body, {
          message: 'list of posts',
          data: PostsMock,
        });
        done();
      });
    });
  });

  describe('POST /posts', () => {
    it('should response with status code 201', (done) => {
      request.post('/api/posts')
        .set('Content-Type', 'appication/json')
        .send(PostsMock[0])
        .expect(201, done);
    });
    it('should response witha new post', (done) => {
      request.post('/api/posts')
        .set('Content-Type', 'appication/json')
        .send(PostsMock[0])
        .end((err, res) => {
          assert.deepEqual(res.body, {
            message: 'post created',
            data: PostsMock[0],
          });
          done();
        });
    });
  });

  describe('GET /posts/:id', () => {
    it('should response with status code 200', (done) => {
      request.get(`/api/posts/${PostsMock[0].slug}`).expect(200, done);
    });
    it('should response with a post', (done) => {
      request.get(`/api/posts/${PostsMock[0].slug}`)
        .end((err, res) => {
          assert.deepEqual(res.body, {
            message: 'post ready',
            data: PostsMock[0],
          });
          done();
        });
    });
  });

  describe('PATCH /posts/:id', () => {
    it('should response with status code 200', (done) => {
      request.patch(`/api/posts/${PostsMock[0].slug}`)
        .set('Content-Type', 'appication/json')
        .send(PostsMock[0])
        .expect(200, done);
    });
    it('should response with a post updated', (done) => {
      request.patch(`/api/posts/${PostsMock[0].slug}`)
        .set('Content-Type', 'appication/json')
        .send(PostsMock[0])
        .end((err, res) => {
          assert.deepEqual(res.body, {
            message: 'post updated',
            data: PostsMock[0],
          });
          done();
        });
    });
  });

  describe('DELETE /posts/:id', () => {
    it('should response with status code 200', (done) => {
      request.delete(`/api/posts/${PostsMock[0].slug}`).expect(200, done);
    });
    it('should response with status code 200', (done) => {
      request.delete(`/api/posts/${PostsMock[0].slug}`)
        .end((err, res) => {
          assert.deepEqual(res.body, {
            message: 'post deleted',
            data: PostsMock.find((post) => post.slug === PostsMock[0].slug),
          });
          done();
        });
    });
  });
});
