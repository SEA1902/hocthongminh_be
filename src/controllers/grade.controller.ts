import Grade from "../entity/grade";
import Course from "../entity/course";

const GradeModel = require("../models/grade.model");
const CourseModel = require("../models/course.model");

exports.getGradeAndCourseList = async (req: any, res: any) => {
  const classNumber = req.query.classNumber;

  await GradeModel.findOne({ classNumber: classNumber })
    .then(async (grade: Grade) => {
      const gradeId = grade._id.toString();
      var courseList = await CourseModel.find({});
      courseList = courseList.filter(
        (course: Course) => course.gradeId == gradeId
      );
      const data = {
        grade: grade,
        courseList: courseList,
      };

      res.status(200).send(data);
    })
    .catch((err: any) => {
      res.status(500).send({
        message: err.message || "Some error occurred",
      });
    });
};
