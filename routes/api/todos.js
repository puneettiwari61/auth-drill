var express = require("express");
var router = express.Router();
var auth = require("../../modules/auth");
var todo = require("../../controllers/todos");

/* create todo */
router.post("/create", auth.verifyToken, auth.isMentor, todo.createOne);

// list todos
router.get("/", auth.verifyToken, todo.listAll);

module.exports = router;
