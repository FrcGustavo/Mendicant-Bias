const Post = require('../services/PostsService');
const success = require('../utils/responses/success');

async function index(req, res, next) {
  const { limit, sort, page } = req.query;
  try {
    const posts = await Post.findAll({ limit, sort, page });
    success(res, 'posts listed', posts, 200);
  } catch (error) {
    next(error);
  }
}

async function create(req, res, next) {
  const post = req.body;
  const { payload } = req;
  try {
    const createdPost = await Post.create(post, payload);
    success(res, 'post created', createdPost, 201);
  } catch (error) {
    next(error);
  }
}

async function show(req, res, next) {
  const { slug } = req.params;
  try {
    const post = await Post.findBySlug(slug);
    success(res, 'post ready', post, 200);
  } catch (error) {
    next(error);
  }
}

async function update(req, res, next) {
  const post = req.body;
  const { slug } = req.params;
  try {
    const updatedPost = await Post.update(slug, post);
    success(res, 'post updated', updatedPost, 200);
  } catch (error) {
    next(error);
  }
}

async function destroy(req, res, next) {
  const { slug } = req.params;
  try {
    const deletedPost = await Post.destroy(slug);
    success(res, 'post deleted', deletedPost, 200);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  index,
  create,
  show,
  update,
  destroy,
};
