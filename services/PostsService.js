const showdown = require('showdown');
const Post = require('../models/PostModel');
const slugify = require('../utils/plugins/slugify');
const { NotFoundError, FieldsRequiredError } = require('../utils/Errors');

const converter = new showdown.Converter();

async function buildSlug(prevSlug) {
  const existSlug = await Post.countDocuments({ slug: prevSlug });
  if (existSlug > 0) {
    return buildSlug(`${prevSlug}-${existSlug}`);
  }
  return prevSlug;
}
async function findAll(query) {
  const limit = Number(query.limit) || 10;
  const sort = query.sort ? String(query.sort) : '-_id';
  const skip = (Number(query.page || 1) - 1) * limit;

  const posts = await Post.find({ isPublic: true, isActive: true }, 'title cover description slug').limit(limit).sort(sort).skip(skip);
  if (posts.length === 0) {
    throw new NotFoundError('list of posts not found', 404);
  }

  const totalPosts = await Post.countDocuments({ isPublic: true, isActive: true });
  const pagination = {
    totalDocuments: totalPosts,
    totalPages: Math.ceil(totalPosts / (limit)),
    page: query.page || 1,
  };

  return { posts, pagination };
}

async function create(data, payload) {
  const isPublic = false;
  const views = 0;
  const timeShared = 0;
  const likes = 0;
  const {
    username: author,
    sub: authorUid,
  } = payload;
  const {
    title,
    post,
    cover,
    description,
    keywords,
  } = data;
  let { slug } = data;

  if (!title || !description || !cover || !post || !keywords) {
    throw new FieldsRequiredError('All fields is required');
  }

  if (!slug) {
    const prevSlug = slugify(title);
    slug = await buildSlug(prevSlug);
  }

  const createdPost = await Post.create({
    title,
    post,
    cover,
    description,
    keywords,
    slug,
    isPublic,
    views,
    timeShared,
    likes,
    author,
    authorUid,
  });

  return createdPost;
}

async function findBySlug(slug) {
  const post = await Post.findOne({ slug, isPublic: true, isActive: true });
  if (!post) {
    throw new NotFoundError(`the resource ${slug} not found`, 404);
  }
  post.post = converter.makeHtml(post.post);
  return post;
}

async function update(slug, post) {
  const updatedPost = await Post.updateOne({ slug }, post);
  return updatedPost;
}

async function destroy(slug) {
  const deletedPost = await Post.updateOne({ slug }, { isActive: false });
  return deletedPost;
}

module.exports = {
  findAll,
  create,
  findBySlug,
  update,
  destroy,
};
