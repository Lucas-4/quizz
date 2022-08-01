const express = require('express');

const Quiz = require('../models/quiz');

const User = require('../models/user');

const routes = express.Router();

routes.get('/user', async (req, res, next) => {
    if(!req.session.isLogged){
        return res.redirect('/');
    }
    const user = new User();
    await user.getAllQuiz(req.session.userid);
    res.render('user', {username: req.session.username, quizList: user.quizList, isLogged: req.session.isLogged});
})

module.exports = routes;
