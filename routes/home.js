const express = require("express");

const Quiz = require("../models/quiz");

const routes = express.Router();

routes.get("/", (req, res, next) => {
  const quiz = new Quiz();
  let a = quiz.getAll();
  res.render("home", { isLogged: req.session.isLogged, quizList: a });
});

module.exports = routes;
