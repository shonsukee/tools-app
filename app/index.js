var cors = require("cors");
var express = require("express");
var app = express();
app.use(cors());

app.use("/user/create", require("./user/CreateUser.js"))
app.use("/user/find", require("./user/FindUser.js"))


app.use("/store/all", require("./store/GetStoreAll.js"))
app.use("/store/ingredient/all", require("./store/GetStoreAll.js"))



app.use("/cart/add/many", require("./cart/AddCartMany.js"))
app.use("/cart/all", require("./cart/GetCartAll.js"))


app.listen(8000);