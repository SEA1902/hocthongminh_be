import Knowledge from "../entity/knowledege";

const KnowledgeModel = require("../models/knowledge.model");

exports.getKnowledgeList = async (req: any, res: any) => {
  const page = req.query.page;
  const limit = 6;

  await KnowledgeModel.paginate({}, { page, limit })
    .then((data: any) => {
      res.status(200).send({
        knowledgesList: data.docs,
        currentPage: data.page,
        totalPages: data.totalPages,
      });
    })
    .catch((err: any) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while registering the user",
      });
    });
};
exports.getBySlug = async (req: any, res: any) => {
  const slug = req.query.slug;
  await KnowledgeModel.findOne({ slug: slug })
    .then((knowledge: Knowledge) => {
      res.status(200).send(knowledge);
    })
    .catch((err: any) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while registering the user",
      });
    });
};
