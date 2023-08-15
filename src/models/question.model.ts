import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
  id: String,
  topicId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Topic",
  },
  level: Number,
  name: String,
  quizChoice: [String],
  answer: Number,
  explain: String,
});

module.exports = mongoose.model("Question", QuestionSchema);
