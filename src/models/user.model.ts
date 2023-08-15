import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  id: String,
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
