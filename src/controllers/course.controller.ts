import Course from "../entity/course";
import Grade from "../entity/grade";
import Topic from "../entity/topic";

const TopicModel = require("../models/topic.model");
const CourseModel = require("../models/course.model");
const GradeModel = require("../models/grade.model");
const UserTopicModel = require("../models/userTopic.model");
const UserTopicResultModel = require("../models/userTopicResult.model");
exports.getCourseAndTopicList = async (req: any, res: any) => {
  const courseSlug = req.body.courseSlug;
  const classNumber = req.body.classNumber;
  const typeTopic = req.body.typeTopic;
  const userId = req.body.userId;

  const grade = await GradeModel.findOne({ classNumber: classNumber });

  const gradeId = grade._id.toString();

  var course = await CourseModel.find({
    slug: courseSlug,
  });

  course = course.filter((course: Course) => course.gradeId == gradeId)[0];
  if (!course) {
    return res.status(404).send("Course not found");
  }

  var topicList = await TopicModel.find({
    type: typeTopic,
  });

  var topicListUser = await Promise.all(
    topicList
      .filter((topic: Topic) => topic.courseId == course._id.toString())
      .map(async (topic: Topic) => {
        const userTopic = await UserTopicModel.findOne({
          topicId: topic._id,
          userId: userId,
        });

        if (userTopic) {
          const userTopicResult = await UserTopicResultModel.findOne({
            userTopicId: userTopic._id,
          });
          const topicInfo = new Topic(topic);
          const data = {
            ...topicInfo,
            evaluate: userTopicResult.score / userTopicResult.answer.length,
          };
          return data;
        } else return topic;
      })
  );
  const data = {
    course: course,
    topicList: topicListUser,
  };

  res.status(200).send(data);
};
