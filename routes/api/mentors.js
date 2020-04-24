var express = require("express");
var router = express.Router();
var mentors = require("../../controllers/mentors");

/* student signup */
router.post("/signup", mentors.signUp);

/* student login */
router.post("/login", mentors.login);

module.exports = router;
