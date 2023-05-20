var cors = require("cors");
var express = require("express");
var app = express();
app.use(cors());

app.use("/user/create", require("./user/CreateUser.js"));
app.use("/user/delete", require("./user/DeleteUser.js"));
app.use("/user/update", require("./user/UpdateUser.js"));
app.use("/user/find", require("./user/FindUser.js"));
app.use("/user/all", require("./user/AllUser.js"));

app.use("/ingredient/create", require("./ingredient/CreateIngredient.js"));
app.use("/ingredient/delete", require("./ingredient/DeleteIngredient.js"));
app.use("/ingredient/update", require("./ingredient/UpdateIngredient.js"));
app.use("/ingredient/find", require("./ingredient/FindIngredient.js"));
app.use("/ingredient/all", require("./ingredient/AllIngredient.js"));

app.use("/inventory/all", require("./inventory/AllInventory.js"));
app.use("/inventory/create", require("./inventory/CreateInventory.js"));
app.use("/inventory/find", require("./inventory/FindInventory.js"));

app.use("/news/scraping", require("./chat/scraping.js"));

app.listen(8000);
