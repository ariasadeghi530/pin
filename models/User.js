const { model, Schema } = require('mongoose');

const UserSchema = new Schema({
  username: String,
  email: String,
  github: String,
  ideas: [
    {
      type: Schema.Types.ObjectId,
      ref: 'post'
    }
  ],
  projects: [
    {
      type: Schema.Types.ObjectId,
      ref: 'post'
    }
  ]
});

UserSchema.plugin(require('passport-local-mongoose'));


module.exports = model('user', UserSchema);