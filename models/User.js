var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  name: String,
  email: String,
  role: String,
  password: String,
});

module.exports = mongoose.model('User', UserSchema);
