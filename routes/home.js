const express = require('express');

const Quiz = require('../models/quiz');

const routes = express.Router();

routes.get('/', async (req, res, next) => {
    const quiz = new Quiz();
    let a = await quiz.getAll();
    res.render('home', {isLogged: req.session.isLogged, quizList: a});
})

module.exports = routes;