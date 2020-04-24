var express = require("express");
var router = express.Router();

/* signup */
router.get("/signup", function(req, res, next) {
  res.json({ success: true });
});

module.exports = router;
