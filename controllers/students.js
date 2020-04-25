var Student = require("../models/students");

module.exports = {
  signUp: async (req, res) => {
    try {
      var student = await Student.create(req.body);
      student.password = "";
      res.json({ success: true, student });
    } catch (err) {
      console.log(err);
      res.json({ success: false, err });
    }
  },
  login: async (req, res) => {
    try {
      console.log(req.session);
      var student = await Student.findOne({ email: req.body.email });
      if (!student)
        return res.json({ success: false, msg: "incorrect credentials" });
      if (!student.verifyPassword(req.body.password)) {
        return res.json({ success: false, msg: "incorrect password" });
      }
      req.session.userId = student._id;
      student.password = "";
      res.json({ success: true, student });
    } catch (err) {
      console.log(err);
      res.json({ success: false, err });
    }
  }
};
