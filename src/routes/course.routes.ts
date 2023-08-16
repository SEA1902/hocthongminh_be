import express from "express";
const router = express.Router();
const courseController = require("../controllers/course.controller");

router.post(
  "/get-course-and-topic-list",
  courseController.getCourseAndTopicList
);

// router.get("/get-course-by-id", courseController.getCourseById);

module.exports = router;
