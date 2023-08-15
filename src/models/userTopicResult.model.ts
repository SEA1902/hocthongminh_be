import mongoose from "mongoose";

const UserTopicResultSchema = new mongoose.Schema(
  {
    id: String,
    answer: [Number],
    score: Number,
    userTopicId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserTopic",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserTopicResult", UserTopicResultSchema);
