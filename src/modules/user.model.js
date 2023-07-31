const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  id: Number,
  username: String,
  password: String,
  name: String,
  email: String,
  phone: String,
  avatar: String,
  sex: Number,
  classNumber: Number,
  birthday: String,
  school: String,
});

module.exports = mongoose.model("User", UserSchema);
