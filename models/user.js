const Quiz = require('./quiz');

const path = require('path');

const fs = require('fs');

const p = path.join(__dirname, '../', 'data', 'user.json');

module.exports = class User{
    constructor(name, password){
        this.name = name;
        this.password = password;
    }

    save(){
        try{
            let data = fs.readFileSync(p, 'utf8');
            data = JSON.parse(data);
            this.id = data.IDcounter;
            data.userList.push(this);
            data.IDcounter++;
            data = JSON.stringify(data);
            fs.writeFileSync(p, data);

        } catch(err){
            console.log(err);
        }
    }

    get(username){
        let data = fs.readFileSync(p, 'utf8');
        data = JSON.parse(data);
        for(let user of data.userList){
            if(username===user.name){
                return user;
            }
        }
        return undefined;
    }

    getAllQuiz(userid){
        try{
            let data = fs.readFileSync(path.join(__dirname, '../', 'data', 'quiz.json'), 'utf8');
            data = JSON.parse(data);
            let quizList = [];
            for(let quiz of data.quizList){
                if(quiz.userid===userid){
                    quizList.push(quiz);
                }
            }
            return quizList;
        } catch (err){
            console.log(err);
        }
    }
}
