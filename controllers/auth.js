const User = require("../models/user");

const bcrypt = require("bcryptjs");

exports.getSignup = (req, res, next) => {
  if (req.session.isLogged) {
    return res.redirect("/user");
  }
  res.render("signup", { isLogged: req.session.isLogged });
};

exports.postSignup = (req, res, next) => {
  const username = req.body.user;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;

  if (password != confirmPassword || password == "") {
    return res.redirect("/signup");
  }

  let user = new User().get(username);
  if (!(user === undefined)) {
    return res.redirect("/signup");
  }

  bcrypt
    .hash(password, 12)
    .then((hashedPassword) => {
      user = new User(username, hashedPassword);
      user.save();
      return res.redirect("/login");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getLogin = (req, res, next) => {
  if (req.session.isLogged) {
    return res.redirect("/user");
  }
  res.render("login", { isLogged: req.session.isLogged });
};

exports.postLogin = (req, res, next) => {
  let user = new User();
  user = user.get(req.body.user);
  if (!user) {
    return res.redirect("/login");
  }
  const encryptedPassword = user.password;
  bcrypt
    .compare(req.body.password, encryptedPassword)
    .then((doMatch) => {
      if (doMatch) {
        req.session.isLogged = true;
        req.session.username = user.name;
        req.session.userid = user.id;
        return res.redirect("/user");
      }
      return res.redirect("/login");
    })
    .catch((err) => {
      console.log(err);
      return res.redirect("/login");
    });
};

exports.getLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
  })
  res.redirect('/');
}