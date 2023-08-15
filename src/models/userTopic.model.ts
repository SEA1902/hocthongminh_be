import mongoose from "mongoose";

const UserTopicSchema = new mongoose.Schema({
  id: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  topicId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Topic",
  },
});

module.exports = mongoose.model("UserTopic", UserTopicSchema);
