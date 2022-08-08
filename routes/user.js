const express = require("express");

const Quiz = require("../models/quiz");

const User = require("../models/user");

const routes = express.Router();

routes.get("/user", (req, res, next) => {
  if (!req.session.isLogged) {
    return res.redirect("/");
  }
  const user = new User();
  const quizList = user.getAllQuiz(req.session.userid);
  res.render("user", {
    username: req.session.username,
    quizList: quizList,
    isLogged: req.session.isLogged,
  });
});

module.exports = routes;
