var cors = require("cors");
var express = require("express");
var app = express();
app.use(cors());

app.use("/user/create", require("./user/CreateUser.js"));
app.use("/user/find", require("./user/FindUser.js"));

app.use("/ingredient/create", require("./ingredient/CreateIngredient.js"));
app.use("/ingredient/delete", require("./ingredient/DeleteIngredient.js"));
app.use("/ingredient/update", require("./ingredient/UpdateIngredient.js"));
app.use("/ingredient/find", require("./ingredient/FindIngredient.js"));
app.use("/ingredient/all", require("./ingredient/AllIngredient.js"));

app.use("/store/all", require("./store/GetStoreAll.js"));
app.use("/store/ingredient/all", require("./store/GetStoreAll.js"));

app.use("/news/scraping", require("./chat/scraping.js"));

app.use("/cart/add/many", require("./cart/AddCartMany.js"));
app.use("/cart/all", require("./cart/GetCartAll.js"));

app.listen(8000);
