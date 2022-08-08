const fs = require('fs');

const path = require('path');

const p = path.join(__dirname, '../', 'data', 'quiz.json');

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
    }
}

class Quiz {
    constructor(quizTitle, quizDes){
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
            tmpQ.create(title[i], rightOption[i], optionsArray);
            this.questions.push(tmpQ);
            optionsArray = [];
        }
    }

    save(userid){
        try{
            this.userid = userid;
            let data = fs.readFileSync(p, 'utf8');
            data = JSON.parse(data);
            let IDcounter = data.IDcounter;
            this.id = IDcounter;
            IDcounter++;
            data.IDcounter = IDcounter;
            data.quizList.push(this);
            data = JSON.stringify(data);
            fs.writeFileSync(p, data);
        } catch (err){
            console.log(err);
        }
    }
    

    getById(quizid){
        try{
            let data = fs.readFileSync(p, 'utf8');
            data = JSON.parse(data);
            let quizList = data.quizList;
            for(let quiz of quizList){
                if(quiz.id==quizid){
                    return quiz;
                }
            }
        } catch(err){
            console.log(err);
        }
        
    }

    getAll(){
        try{
            let data = fs.readFileSync(p, 'utf8');
            data = JSON.parse(data);
            return data.quizList;
        } catch (err){
            console.log(err);
        }
        
    }
}
module.exports = Quiz;