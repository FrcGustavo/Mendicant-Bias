const mongoose = require('mongoose');

const { Schema } = mongoose;

const CommentSchema = new Schema({
  comment: {
    type: String,
    required: true,
  },
  postUid: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'posts',
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
},
{
  timestamps: true,
});

const Comment = mongoose.model('comments', CommentSchema);

module.exports = Comment;
