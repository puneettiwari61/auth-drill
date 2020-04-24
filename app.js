var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

//connect to database
mongoose.connect(
  "mongodb://localhost/auth",
  { useNewUrlParser: true, useUnifiedTopology: true },
  err => {
    console.log(err ? err : "db connected");
  }
);

module.exports = app;
