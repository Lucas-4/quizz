const express = require("express");

const authController = require("../controllers/auth");

const routes = express.Router();

routes.get("/signup", authController.getSignup);

routes.post("/signup", authController.postSignup);

routes.get("/login", authController.getLogin);

routes.post("/login", authController.postLogin);

routes.get("/logout", authController.getLogout);

module.exports = routes;
