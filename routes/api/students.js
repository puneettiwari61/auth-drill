var express = require("express");
var router = express.Router();
var student = require("../../controllers/students");
var middleware = require("../../modules/middlewares");

/* student signup */
router.post("/signup", student.signUp);

/* student login */
router.post("/login", student.login);

module.exports = router;
