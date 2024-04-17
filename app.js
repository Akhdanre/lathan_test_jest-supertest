var express = require('express');
var logger = require('morgan');
var app = express();

const userRoute = require("./routes/users.routes")
const authRoute = require("./routes/auth.routes")


app.use(logger('dev'));
app.use(express.json());


app.use("/api/v1/users", userRoute)
app.use("/api/v1/auth", authRoute)

module.exports = app;
