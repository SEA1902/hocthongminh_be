const Knowledge = require("../modules/knowledge.model");

exports.getKnowledgeList = async (req, res) => {
  const page = req.query.page;
  const limit = 6;
  await Knowledge.paginate({}, { page, limit })
    .then((data) => {
      res.status(200).send({
        knowledgesList: data.docs,
        currentPage: data.page,
        totalPages: data.totalPages,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while registering the user",
      });
    });
};
exports.getBySlug = async (req, res) => {
  const slug = req.query.slug;
  await Knowledge.findOne({ slug: slug })
    .then((knowledge) => {
      res.status(200).send(knowledge);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while registering the user",
      });
    });
};
