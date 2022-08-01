const db = require('../database');

const Quiz = require('./quiz');

module.exports = class User{
    constructor(name, password){
        this.id;
        this.name = name;
        this.password = password;
        this.quizList = [];
    }
    save(){
        return db.execute('INSERT INTO users (username, password) VALUES (?, ?)', [this.name, this.password])
    }

    get(username){
        return db.execute('SELECT * FROM users WHERE BINARY users.username = ?', [username]);
    }

    async getAllQuiz(userid){
        let result = await db.execute('SELECT quizid FROM quiz WHERE quiz.userid = ?', [userid]);
        let quizids = result[0];
        for(let quizid of quizids){
            let tmpQuiz = new Quiz();
            await tmpQuiz.getById(quizid.quizid);
            this.quizList.push(tmpQuiz);
        }
    }
}
