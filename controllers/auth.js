const db = require('../database');

const User = require('../models/user');

const bcrypt = require('bcryptjs');

exports.getSignup = (req, res, next) => {
    if(req.session.isLogged){
        return res.redirect('/user');
    }
    res.render('signup', {isLogged: req.session.isLogged});
}

exports.postSignup = (req, res, next) => {
    const username = req.body.user;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;

    if(password!=confirmPassword || password==''){
        return res.redirect('/signup');
    }

    new User().get(username).then(result => {
        if(!(result[0][0]===undefined)){
			console.log(result[0][0]);
            return res.redirect('/signup');
        }

        bcrypt.hash(password, 12)
        .then( hashedPassword => {
            const user = new User(username, hashedPassword);
            user.save();
			return res.redirect('/login');
        })
        .catch(err => {
            console.log(err);
        })
    })
    .catch(err => {
        console.log(err);
    })
    
}

exports.getLogin = (req, res, next) => {
    if(req.session.isLogged){
        return res.redirect('/user');
    }
    res.render('login', {isLogged: req.session.isLogged});
}

exports.postLogin = (req, res, next) => {
    new User().get(req.body.user)
    .then(result => {
        if(!result){
            return res.redirect('/login');
        }
        const user = result[0][0];
        const encryptedPassword = result[0][0].password;

        bcrypt.compare(req.body.password, encryptedPassword)
        .then( doMatch => {
            if(doMatch){
				req.session.isLogged = true;
				req.session.username = user.username;
				req.session.userid = user.userid;
				return res.redirect('/user');
            }
			return res.redirect('/login');
        })
		.catch(err => {
			console.log(err);
			return res.redirect('/login');
		})
        
     })
     .catch(err => {
        console.log(err);
		return res.redirect('/login');
     });
}