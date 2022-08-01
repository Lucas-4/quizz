const Quiz = require('../models/quiz');

exports.getPlayQuiz = async (req, res, next) => {
    const quizid = req.params.quizid;
    const quiz = new Quiz();
    await quiz.getById(quizid);
    console.log(quiz);
    const rightOptions = [];
    quiz.questions.forEach((question) => {
        rightOptions.push(question.rightOption);
    });
    req.session.rightOptions = rightOptions;
    res.render('play-quiz', {isLogged: req.session.isLogged, quiz: quiz});
}

exports.postPlayQuiz = (req, res, next) => {
    const questionNum = req.session.rightOptions.length;
    let count = 0;
    for(let i = 0; i<req.body.length; i++){
        if(req.body[i]==req.session.rightOptions[i]){
            count++;
        }
    }
    res.json({result: `${count}/${questionNum}`});
}

