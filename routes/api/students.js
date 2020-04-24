var express = require("express");
var router = express.Router();
var student = require("../../controllers/students");

/* student signup */
router.post("/signup", student.signUp);

/* student login */
router.post("/login", student.login);

module.exports = router;
