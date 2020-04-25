var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var session = require("express-session");
const MongoStore = require("connect-mongo")(session);
var indexRouter = require("./routes/api");
var middleware = require("./modules/middlewares");
require("dotenv").config();

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(
  session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  })
);

app.use(express.static(path.join(__dirname, "public")));

app.use(middleware.loggedUserInfo);

app.use("/api/v1", indexRouter);

//connect to database
mongoose.connect(
  "mongodb://localhost/cook",
  { useNewUrlParser: true, useUnifiedTopology: true },
  err => {
    console.log(err ? err : "db connected");
  }
);

module.exports = app;
