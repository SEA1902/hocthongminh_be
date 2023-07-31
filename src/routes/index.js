const userRouter = require("./user.routes");
const knowledgeRouter = require("./knowledge.routes");
function route(app) {
  app.use("/users", userRouter);
  app.use("/knowledges", knowledgeRouter);
}

module.exports = route;
