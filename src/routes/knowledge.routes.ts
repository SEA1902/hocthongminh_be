import express from "express";
const router = express.Router();
const knowledgeController = require("../controllers/knowledge.controller");

router.get("/get-knowledge-list", knowledgeController.getKnowledgeList);

router.get("/get-by-slug", knowledgeController.getBySlug);

module.exports = router;
