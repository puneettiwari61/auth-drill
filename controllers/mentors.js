var Mentor = require("../models/mentors");
var auth = require("../modules/auth");

module.exports = {
  signUp: async (req, res) => {
    try {
      var mentor = await Mentor.create(req.body);
      var token = await auth.generateJWT(mentor);
      mentor.password = "";
      res.json({ success: true, mentor, token });
    } catch (err) {
      console.log(err);
      res.json({ success: false, err });
    }
  },
  login: async (req, res) => {
    try {
      var mentor = await Mentor.findOne({ email: req.body.email });
      if (!mentor)
        return res.json({ success: false, msg: "incorrect credentials" });
      if (!mentor.verifyPassword(req.body.password)) {
        return res.json({ success: false, msg: "incorrect password" });
      }
      var token = await auth.generateJWT(mentor);
      mentor.password = "";
      res.json({ success: true, mentor, token });
    } catch (err) {
      console.log(err);
      res.json({ success: false, err });
    }
  }
};
