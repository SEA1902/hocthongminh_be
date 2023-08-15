import mongoose from "mongoose";

const GradeSchema = new mongoose.Schema({
  id: String,
  classNumber: Number,
  title: String,
  description: String,
});
module.exports = mongoose.model("Grade", GradeSchema);
