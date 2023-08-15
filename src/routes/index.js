const userRouter = require("./user.routes");
const knowledgeRouter = require("./knowledge.routes");
const gradeRouter = require("./grade.routes");
const courseRouter = require("./course.routes");
const topicRouter = require("./topic.routes");

function route(app) {
  app.use("/users", userRouter);
  app.use("/knowledges", knowledgeRouter);
  app.use("/grades", gradeRouter);
  app.use("/courses", courseRouter);
  app.use("/topics", topicRouter);
}

module.exports = route;
