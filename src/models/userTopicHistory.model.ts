import mongoose from "mongoose";

const UserTopicResult = new mongoose.Schema(
  {
    answer: [Number],
    score: Number,
  },
  { timestamps: true }
);
const UserTopicHistorySchema = new mongoose.Schema({
  id: String,
  userTopicId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserTopic",
  },
  history: [UserTopicResult],
});

module.exports = mongoose.model("UserTopicHistory", UserTopicHistorySchema);
