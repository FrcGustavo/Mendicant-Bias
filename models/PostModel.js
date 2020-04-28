const mongoose = require('mongoose');

const { Schema } = mongoose;

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  cover: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    unique: true,
    required: true,
  },
  post: {
    type: String,
    required: true,
  },
},
{
  timestamps: true,
});

const Post = mongoose.model('posts', postSchema);

module.exports = Post;
