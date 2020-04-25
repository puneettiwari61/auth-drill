var express = require("express");
var router = express.Router();
var todo = require("../../controllers/todos");
var middleware = require("../../modules/middlewares");

// list todos
router.get("/", middleware.isUserLogged, todo.listAll);

/* create todo */
router.post(
  "/create",
  middleware.isUserLogged,
  middleware.isMentor,
  todo.createOne
);

module.exports = router;
