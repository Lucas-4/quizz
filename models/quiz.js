const db = require('../database');

let quizList = [];

class Question {
    constructor(){
        this.title;
        this.rightOption;
        this.options;
    }

    create(title, rightOption, options){
        this.title = title;
        this.rightOption = rightOption;
        this.options = options;
        return this;
    }
}

class Quiz {
    constructor(quizTitle, quizDes){
        this.id;
        this.quizTitle = quizTitle;
        this.quizDes = quizDes;
        this.questions = [];
    }

    create(title, rightOption, allOptions){
        for( let i = 0; i<title.length; i++){
            let optionsArray = [];
            for(let j = i*3; j<(i*3)+3; j++){
                optionsArray.push(allOptions[j]);
            }
            let tmpQ = new Question();
            tmpQ = tmpQ.create(title[i], rightOption[i], optionsArray);
            this.questions.push(tmpQ);
            optionsArray = [];
        }
    }

    save(userid){
        db.execute('INSERT INTO quiz (quiztitle, quizdes, userid) VALUES (?, ?, ?)', [this.quizTitle, this.quizDes, userid]).then(result => {
            let quizid = result[0].insertId;
            for(let question of this.questions){
                db.execute('INSERT INTO questions (quizid, questiontitle, questionropt, qopt1, qopt2, qopt3) VALUES (?, ?, ?, ?, ?, ?)', [quizid, question.title, question.rightOption, question.options[0], question.options[1], question.options[2]]);
            }
        });
    }

    async getById(quizid){
        let quiz = await db.execute('SELECT * FROM quiz WHERE quiz.quizid = ?', [quizid]);
        if(!(quiz[0][0]==undefined)){
            this.id = quiz[0][0].quizid;
            this.quizTitle = quiz[0][0].quiztitle;
            this.quizDes = quiz[0][0].quizdes;
        }

        let questions = await db.execute('SELECT * FROM questions WHERE questions.quizid = ?', [quizid]);
        for(let question of questions[0]){
            let qTmp = new Question();
            let options = [];
            options.push(question.qopt1);
            options.push(question.qopt2);
            options.push(question.qopt3);
            qTmp.create(question.questiontitle, question.questionropt, options);
            this.questions.push(qTmp);
        }
    }

    async getAll(){
        let result = await db.execute('SELECT quizid FROM quiz');
        quizList = [];
        let allQuiz = result[0];
        for(let quiz of allQuiz){
            let newQuiz = new Quiz();
            await newQuiz.getById(quiz.quizid);
            quizList.push(newQuiz);
        }
        return quizList;
        
    }
}

module.exports = Quiz;