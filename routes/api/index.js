var express = require("express");
var router = express.Router();
var Student = require("../../models/students");
var Mentor = require("../../models/mentors");
var auth = require("../../modules/auth");
var studentsRouter = require("./students");
var mentorsRouter = require("./mentors");
var todosRouter = require("./todos");

/* identification signup */
router.get("/current", auth.verifyToken, async (req, res) => {
  try {
    if (req.user.isMentor) {
      var user = await Mentor.findById(req.user.userID);
      if (!user) return res.json({ success: false, msg: "inavlid user" });
      user.password = "";
      res.json({ success: true, user });
    } else if (req.user.isMentor == false) {
      var user = await Student.findById(req.user.userID);
      if (!user) return res.json({ success: false, msg: "inavlid user" });
      user.password = "";
      res.json({ success: true, user });
    }
  } catch (err) {
    console.log(err);
    res.json({ success: false, err });
  }
});

router.use("/students", studentsRouter);
router.use("/mentors", mentorsRouter);
router.use("/todos", todosRouter);
module.exports = router;
