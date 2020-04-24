var express = require("express");
var router = express.Router();
var auth = require("../../modules/auth");
var todo = require("../../controllers/todos");

// list todos
router.get("/", auth.verifyToken, todo.listAll);

/* create todo */
router.post("/create", auth.verifyToken, auth.isMentor, todo.createOne);

module.exports = router;
