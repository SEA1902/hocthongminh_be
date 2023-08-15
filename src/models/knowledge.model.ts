import mongoose from "mongoose";
const mongoosePaginate = require("mongoose-paginate-v2");

const KnowledgeSchema = new mongoose.Schema(
  {
    id: String,
    title: String,
    content: String,
    slug: String,
  },
  { timestamps: true }
);
KnowledgeSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("Knowledge", KnowledgeSchema);
