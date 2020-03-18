require('dotenv').config();

module.exports = require('mongoose').connect(process.env.MONGODB_URI || 'mongodb://localhost/pin',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });