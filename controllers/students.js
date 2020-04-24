var Student = require("../models/students");
var auth = require("../modules/auth");
module.exports = {
  signUp: async (req, res) => {
    try {
      var student = await Student.create(req.body);
      var token = await auth.generateJWT(student);
      student.password = "";
      res.json({ success: true, student, token });
    } catch (err) {
      console.log(err);
      res.json({ success: false, err });
    }
  },
  login: async (req, res) => {
    try {
      var student = await Student.findOne({ email: req.body.email });
      if (!student)
        return res.json({ success: false, msg: "incorrect credentials" });
      if (!student.verifyPassword(req.body.password)) {
        return res.json({ success: false, msg: "incorrect password" });
      }
      var token = await auth.generateJWT(student);
      student.password = "";
      res.json({ success: true, student, token });
    } catch (err) {
      console.log(err);
      res.json({ success: false, err });
    }
  }
};
