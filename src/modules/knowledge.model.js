const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const KnowledgeSchema = mongoose.Schema(
  {
    id: Number,
    title: String,
    content: String,
    slug: String,
  },
  { timestamps: true }
);
KnowledgeSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("Knowledge", KnowledgeSchema);
