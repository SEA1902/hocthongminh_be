const userRouter = require("./user.routes");
const knowledgeRouter = require("./knowledge.routes");
const gradeRouter = require("./grade.routes");
const courseRouter = require("./course.routes");
const topicRouter = require("./topic.routes");

const route = (app: any) => {
  app.use("/users", userRouter);
  app.use("/knowledges", knowledgeRouter);
  app.use("/grades", gradeRouter);
  app.use("/courses", courseRouter);
  app.use("/topics", topicRouter);
};

export default route;
