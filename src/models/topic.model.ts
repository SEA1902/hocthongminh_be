import mongoose from "mongoose";

const TopicSchema = new mongoose.Schema({
  id: String,
  type: Number,
  chapterNumber: Number,
  chapterTitle: String,
  topicNumber: Number,
  topicName: String,
  topicTitle: String,
  timeLimit: Number,
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
  },
});

module.exports = mongoose.model("Topic", TopicSchema);
