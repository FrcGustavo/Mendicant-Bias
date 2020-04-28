const showdown = require('showdown');
const Post = require('../models/PostModel');
const slugify = require('../utils/plugins/slugify');

converter = new showdown.Converter();

async function findAll(query) {
  const limit = Number(query.limit) || 10;
  const sort = query.sort ? String(query.sort) : '-_id';
  console.log(sort);

  const posts = await Post.find().limit(limit).sort(sort);
  return posts.map((currentPost) => {
    const {
      _id, title, description, cover, slug, post,
    } = currentPost;
    return {
      _id, title, description, cover, slug, post,
    };
  });
}

async function create(data) {
  const {
    title,
    description,
    cover,
    post,
  } = data;

  if (!title || !description || !cover) {
    throw 'All fields is required';
  }

  if (!data.slug) {
    data.slug = slugify(title);
  }

  const isSlugRegistered = await isRegisteredSlug({ title });
  if (isSlugRegistered) {
    console.log(`${data.slug}-${isSlugRegistered}`);
    data.slug = `${data.slug}-${isSlugRegistered}`;
  }

  const createdPost = await Post.create({
    title,
    description,
    cover,
    slug: data.slug,
    post,
  });
  return createdPost;
}

async function findBySlug(slug) {
  const post = await Post.findOne({ slug });
  if (!post) {
    throw new Error('Not Found');
  }
  post.__v = undefined;
  post.post = converter.makeHtml(post.post);
  return post;
}

async function update(slug, post) {
  const updatedPost = await Post.updateOne({ slug }, post);
  return updatedPost;
}

async function destroy(slug) {
  const deletedPost = await Post.deleteOne({ slug });
  return deletedPost;
}

async function isRegisteredSlug(query) {
  const countSlug = await Post.countDocuments(query);
  if (countSlug == 0) return false;
  return countSlug;
}

module.exports = {
  findAll,
  create,
  findBySlug,
  update,
  destroy,
};
