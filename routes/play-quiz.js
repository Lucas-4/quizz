const express = require('express');

const playQuizController = require('../controllers/play-quiz');

const routes = express.Router();

routes.get('/play-quiz/:quizid', playQuizController.getPlayQuiz);

routes.post('/play-quiz', playQuizController.postPlayQuiz);

module.exports = routes;