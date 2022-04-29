var mongoose = require("mongoose");

var articleSchema = mongoose.Schema({
  title: String,
  description: String,
  img: String,
});

var userSchema = mongoose.Schema({
  username: String,
  email: String,
  password: String,
  token: String,
  language: String,
  articles: [articleSchema],
});
var userModel = mongoose.model("users", userSchema);

module.exports = userModel;
