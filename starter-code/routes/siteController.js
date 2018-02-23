const express = require("express");
const siteController = express.Router();
const passport = require("passport");
const User = require('../models/user');
const Course = require('../models/course');

siteController.get("/", (req, res, next) => {
  res.render("index");
});

siteController.get("/login", (req, res, next) => {
  res.render("auth/login", { "message": req.flash("error") });
});

siteController.post("/login", passport.authenticate("local", {
  successRedirect: "/list",
  failureRedirect: "/",
  failureFlash: true,
  passReqToCallback: true
}));

siteController.get('/list', (req, res, next) => {
  User.find({}, (err, users) => {
      if (err) {return next(err) }

      res.render('users-list', {
          users: users
      });
  });
});






module.exports = siteController;
