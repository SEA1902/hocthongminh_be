import Course from "../entity/course";
import Grade from "../entity/grade";
import Question from "../entity/question";
import Topic from "../entity/topic";

const TopicModel = require("../models/topic.model");
const CourseModel = require("../models/course.model");
const GradeModel = require("../models/grade.model");
const QuestionModel = require("../models/question.model");
const UserTopicModel = require("../models/userTopic.model");
const UserTopicResultModel = require("../models/userTopicResult.model");
const UserTopicHistoryModel = require("../models/userTopicHistory.model");

exports.getTopicById = async (req: any, res: any) => {
  try {
    const topicId = req.query.topicId;
    var topic = await TopicModel.findById(topicId);
    topic = new Topic(topic);
    if (!topic) {
      return res.status(404).send("Topic not found");
    }
    var questions = await QuestionModel.find({});
    questions = questions.filter(
      (question: Question) => question.topicId == topic._id.toString()
    );

    var course = await CourseModel.findById(topic.courseId);
    course = new Course(course);
    if (!course) {
      return res.status(404).send("Course not found");
    }
    var grade = await GradeModel.findById(course.gradeId);
    grade = new Grade(grade);
    if (!grade) {
      return res.status(404).send("Grade not found");
    }

    const data = {
      topic: topic,
      course: course,
      grade: grade,
      questions: questions,
    };
    res.status(200).send(data);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

exports.getUserTopicHistory = async (req: any, res: any) => {
  try {
    const topicId = req.body.topicId;
    const userId = req.body.userId;

    const userTopic = await UserTopicModel.findOne({
      userId: userId,
      topicId: topicId,
    });

    if (userTopic) {
      const userTopicHistory = await UserTopicHistoryModel.findOne({
        userTopicId: userTopic._id,
      });
      res.status(200).send(userTopicHistory);
    } else {
      return res.status(404).send("userTopic not found");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};
exports.addUserTopicResult = async (req: any, res: any) => {
  const userId = req.body.userId;
  const topicId = req.body.topicId;
  const answer = req.body.answer;
  const score = req.body.score;
  const userTopic = await UserTopicModel.findOne({
    userId: userId,
    topicId: topicId,
  });

  if (userTopic) {
    const userTopicResult = await UserTopicResultModel.findOneAndUpdate(
      { userTopicId: userTopic._id, score: { $lt: score } },
      { answer, score },
      { new: true }
    );

    const userTopicHistory = await UserTopicHistoryModel.findOneAndUpdate(
      { userTopicId: userTopic._id },
      { $push: { history: { answer, score } } },
      {
        new: true,
      }
    );
    const data = {
      userTopicResult: userTopicResult,
      userTopicHistory: userTopicHistory,
    };

    res.status(200).send(data);
  } else {
    const userTopic = new UserTopicModel({
      userId: userId,
      topicId: topicId,
    });
    await userTopic.save();

    const userTopicResult = new UserTopicResultModel({
      userTopicId: userTopic._id,
      answer: answer,
      score: score,
    });
    await userTopicResult.save();
    const userTopicHistory = new UserTopicHistoryModel({
      userTopicId: userTopic._id,
      history: [{ answer, score }],
    });
    await userTopicHistory.save();
    const data = {
      userTopicResult: userTopicResult,
      userTopicHistory: userTopicHistory,
    };
    res.status(200).send(data);
  }
};
