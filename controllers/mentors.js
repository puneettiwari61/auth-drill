var Mentor = require("../models/mentors");

module.exports = {
  signUp: async (req, res) => {
    try {
      var mentor = await Mentor.create(req.body);
      mentor.password = "";
      res.json({ success: true, mentor });
    } catch (err) {
      console.log(err);
      res.json({ success: false, err });
    }
  },
  login: async (req, res) => {
    try {
      var mentor = await Mentor.findOne({ email: req.body.email });
      console.log(mentor, "from controller");
      if (!mentor)
        return res.json({ success: false, msg: "incorrect credentials" });
      if (!mentor.verifyPassword(req.body.password)) {
        return res.json({ success: false, msg: "incorrect password" });
      }
      mentor.password = "";
      req.session.userId = mentor._id;
      res.json({ success: true, mentor });
    } catch (err) {
      console.log(err);
      res.json({ success: false, err });
    }
  }
};
