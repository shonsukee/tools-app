var express = require("express");
var app = express();

// 
app.use("/user/create", require("./user/CreateUser.js"))
app.use("/user/delete", require("./user/DeleteUser.js"))
app.use("/user/update", require("./user/UpdateUser.js"))
app.use("/user/find", require("./user/FindUser.js"))
app.use("/user/all", require("./user/AllUser.js"))



app.listen(8000);