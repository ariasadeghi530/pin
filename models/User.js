const { model, Schema } = require('mongoose');

const UserSchema = new Schema({
  username: {type: String, unique: true, required: true, dropDups: true},
  email: {type: String, unique: true, required: true, dropDups: true},
  github: {type: String, unique: true, required: true, dropDups: true},
  ideas: [
    {
      type: Schema.Types.ObjectId,
      ref: 'post', 
      unique: true,
      dropDups: true
    }
  ],
  projects: [
    {
      type: Schema.Types.ObjectId,
      ref: 'post', 
      unique: true,
      dropDups: true
    }
  ]
});

UserSchema.plugin(require('passport-local-mongoose'));


module.exports = model('user', UserSchema);