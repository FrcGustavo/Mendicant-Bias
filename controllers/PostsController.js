const Post = require('../services/PostsService');

async function index(req, res, next) {
  const { limit, sort } = req.query;
  try {
    const posts = await Post.findAll({ limit, sort });
    res.status(200).json({
      message: 'list of posts',
      data: posts,
    });
  } catch (error) {
    next(error);
  }
}

async function create(req, res, next) {
  const post = req.body;
  try {
    const createdPost = await Post.create(post);
    res.status(201).json({
      message: 'post created',
      data: createdPost,
    });
  } catch (error) {
    next(error);
  }
}

async function show(req, res, next) {
  const { slug } = req.params;
  try {
    const post = await Post.findBySlug(slug);
    res.status(200).json({
      message: 'post ready',
      data: post,
    });
  } catch (error) {
    next(error);
  }
}

async function update(req, res, next) {
  const post = req.body;
  const { slug } = req.params;
  try {
    const updatedPost = await Post.update(slug, post);
    res.json({
      message: 'post updated',
      data: updatedPost,
    });
  } catch (error) {
    next(error);
  }
}

async function destroy(req, res, next) {
  const { slug } = req.params;
  try {
    const deletedPost = await Post.destroy(slug);
    res.json({
      message: 'post deleted',
      data: deletedPost,
    });
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
