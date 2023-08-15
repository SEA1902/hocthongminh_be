import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema({
  name: String,
  description: String,
  image: String,
  slug: String,
  gradeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Grade",
  },
});
module.exports = mongoose.model("Course", CourseSchema);
