var Todo = require("../models/todos");
var auth = require("../modules/auth");

module.exports = {
  createOne: async (req, res) => {
    try {
      req.body.createdBy = req.user.userID;
      var todo = await Todo.create(req.body);
      res.json({ success: true, todo });
    } catch (err) {
      console.log(err);
      res.json({ success: false, err });
    }
  },
  listAll: async (req, res) => {
    try {
      var todos = await Todo.find();
      res.json({ success: true, todos });
    } catch (err) {
      console.log(err);
      res.json({ success: false, err });
    }
  }
};
