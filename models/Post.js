const { model, Schema } = require('mongoose');

const PostSchema = new Schema({
  title: String,
  description: String,
  difficulty: String,
  totalTime: Number,
  imageLinks: [{
    type: Object
  }],
  owner: [{
    type: Schema.Types.ObjectId,
    ref: 'user'
  }],
  solutions:[{
    type: Object
  }],
  comments: [{
    type: Object
  }]
});

module.exports = model('post', PostSchema);