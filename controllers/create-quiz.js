const Quiz = require('../models/quiz');

exports.getCreateQuiz = (req, res, next) => {
    if(!req.session.isLogged){
        return res.redirect('/');
    }
    res.render('create-quiz', {isLogged: req.session.isLogged});
}

exports.postCreateQuiz = (req, res, next) => {
    if(!req.session.isLogged){
        return res.redirect('/');
    }
    const quiz = new Quiz(req.body.quizTitle, req.body.quizDescription);
    quiz.create(req.body.question, req.body.rightOption, req.body.option);
    quiz.save(req.session.userid);
    res.redirect('/');
}