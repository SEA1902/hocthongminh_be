const express = require("express");
const router = express.Router();
const gradeController = require("../controllers/grade.controller");

router.get("/get-grade-and-course-list", gradeController.getGradeAndCourseList);

module.exports = router;
