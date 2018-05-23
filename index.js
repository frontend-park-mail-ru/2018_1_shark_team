"use strict";

const express = require("express");
const app = express();

app.use(express.static(__dirname + "/static"));

app.get('/*', function(req, res) {
    res.header("Cache-Control", "max-age=31536000");
    res.sendfile("static/index.html");
});

app.use(function(req, res, next) {
    res.header("Cache-Control", "max-age=31536000");
    next();
});

const port = process.env.PORT || 5000;
app.listen(port);
console.log("Server works on port " + port);
