var Student = require("../models/students");
var Mentor = require("../models/mentors");

exports.seedUsers = (req, res, next) => {
  var seedMentors = [
    "prashant@altcampus.io",
    "ankit@altcampus.io",
    "suraj@altcampus.io"
  ];
  if (seedMentors.includes(req.body.email)) {
    Mentor.findOne({ email: req.body.email }, (err, mentor) => {
      if (err) return next(err);
      if (mentor) {
        return next();
      }
      if (!mentor) {
        req.body.name = req.body.email.split("@")[0];
        Mentor.create(req.body, (err, mentor) => {
          if (err) return next(err);
          if (mentor) {
            return next();
          }
        });
      }
    });
  }
  // {"email": "prashant@altcampus.io", "password": "mentor007", "name" : "prashant"}
  // {"email": "ankit@altcampus.io", "password": "mentor007", "name" : "ankit"}
  // {"email": "suraj@altcampus.io", "password": "mentor007", "name" : "suraj"}
  else return next();
};

exports.isUserLogged = (req, res, next) => {
  if (req.session && req.session.userId) {
    next();
  } else {
    res.json({ success: false, msg: "You need to login first" });
  }
};

exports.loggedUserInfo = (req, res, next) => {
  if (req.session && req.session.userId) {
    Student.findById(req.session.userId, { password: 0 }, (err, student) => {
      if (err) return next(err);
      if (student) {
        req.user = student;
        next();
      }
      if (!student) {
        Mentor.findById(req.session.userId, { password: 0 }, (err, mentor) => {
          if (err) return next(err);
          req.user = mentor;
          next();
        });
      }
    });
  } else {
    req.user = null;
    next();
  }
};

exports.isMentor = (req, res, next) => {
  if (req.user.isMentor) {
    next();
  } else if (req.user.isMentor == false) {
    res.json({ success: false, msg: "not authorised" });
  }
};
