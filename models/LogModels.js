const mongoose = require('mongoose');

const { Schema } = mongoose;

const LogSchema = new Schema({
  action: {
    type: String,
    enum: ['create', 'update', 'delete'],
    required: 'true',
  },
  author: {
    name: {
      type: String,
      required: true,
    },
    uid: {
      type: mongoose.SchemaTypes.ObjectId,
    },
  },
  resource: {
    name: {
      type: String,
      required: true,
    },
    uid: {
      type: mongoose.SchemaTypes.ObjectId,
    },
  },
},
{
  timestamps: true,
});

const Log = mongoose.model('logs', LogSchema);

module.exports = Log;
