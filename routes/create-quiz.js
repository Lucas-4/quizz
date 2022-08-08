const express = require("express");

const createQuizController = require("../controllers/create-quiz");

const app = express();

const routes = express.Router();

routes.get("/user/create-quiz", createQuizController.getCreateQuiz);

routes.post("/user/create-quiz", createQuizController.postCreateQuiz);

module.exports = routes;
