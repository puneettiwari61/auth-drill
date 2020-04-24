var express = require("express");
var router = express.Router();
var mentors = require("../../controllers/mentors");
var middlewares = require("../../modules/middlewares");

/* student signup */
router.post("/signup", mentors.signUp);

/* student login */
router.post("/login", middlewares.seedUsers, mentors.login);

module.exports = router;
