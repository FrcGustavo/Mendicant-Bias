const mongoose = require('mongoose');

const { Schema } = mongoose;

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  post: {
    type: String,
    required: true,
  },
  cover: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  keywords: {
    type: String,
    default: '',
  },
  slug: {
    type: String,
    unique: true,
    required: true,
  },
  isPublic: {
    type: Boolean,
    default: false,
  },
  views: {
    type: Number,
    default: 0,
  },
  timeShared: {
    type: Number,
    default: 0,
  },
  likes: {
    type: Number,
    default: 0,
  },
  author: {
    type: String,
    required: true,
  },
  authorUid: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'admins',
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

const Post = mongoose.model('posts', postSchema);

module.exports = Post;
