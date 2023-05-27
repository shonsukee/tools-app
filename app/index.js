var cors = require("cors");
var express = require("express");
var app = express();
app.use(cors());

app.use("/user/create", require("./user/CreateUser.js"));
app.use("/user/find", require("./user/FindUser.js"));

app.listen(8000);
