import express from "express";
const router = express.Router();
const topicController = require("../controllers/topic.controller");

router.get("/get-topic-by-id", topicController.getTopicById);

router.post("/add-user-topic-result", topicController.addUserTopicResult);

router.post("/get-user-topic-history", topicController.getUserTopicHistory);

module.exports = router;
