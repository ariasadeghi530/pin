const { model, Schema } = require('mongoose');

const PostSchema = new Schema({
  title: {type:String, required: true},
  description: {type:String, required: true},
  difficulty: {type:String, required: true},
  totalTime: String,
  imageLinks: [{
    type: Object
  }],
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  solutions:[{
    type: Object
  }],
  comments: [{
    type: Object
  }]
});

PostSchema.index({title: 'text', description: 'text', difficulty: 'text', totalTime: 'text'})

module.exports = model('post', PostSchema);