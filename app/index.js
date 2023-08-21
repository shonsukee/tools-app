var cors = require("cors");
var express = require("express");
var app = express();
app.use(cors());

app.use("/user/create", require("./user/CreateUser.js"));
app.use("/user/find", require("./user/FindUser.js"));

//
// app.use(
//   "/store/ingredient/all",
//   require("./cookapp/store/GetIngredientAll.js")
// );
// app.use(
//   "/store/ingredient/create",
//   require("./cookapp/store/CreateIngredient.js")
// );
// app.use(
//   "/store/inventory/create",
//   require("./cookapp/store/CreateInventory.js")
// );

// app.use("/cart/addMany", require("./cookapp/cart/AddCartMany.js"));
// app.use("/cart/all", require("./cookapp/cart/GetCartAll.js"));

// app.use("/recipe/all", require("./cookapp/recipe/GetRecipeRanking.js"));

// //
// app.use("/store/all", require("./store/GetStoreAll.js"));
// app.use("/store/ingredient/all", require("./store/GetStoreAll.js"));

// app.use("/cart/add/many", require("./cart/AddCartMany.js"));
// app.use("/cart/all", require("./cart/GetCartAll.js"));
// //

app.use("/home/tool/create", require("./bookmark/tool/CreateTool.js"));
app.use("/home/tool/update", require("./bookmark/tool/UpdateTool.js"));
app.use("/home/tool/delete", require("./bookmark/tool/DeleteTool.js"));
app.use("/home/tool/get", require("./bookmark/tool/GetTool.js"));
app.use("/home/tool/select", require("./bookmark/tool/SelectTool.js"));
app.use("/home/group/create", require("./bookmark/group/CreateGroup.js"));
app.use("/home/group/get", require("./bookmark/group/GetGroup.js"));
app.use("/home/ogp/get", require("./bookmark/tool/GetOgp.js"));
app.use("/home/ref/create", require("./bookmark/CreateReference.js"));

app.use("/news/get", require("./news/GetNews.js"));

app.use("/gpt/chat", require("./news/gpt/GetChat.js"));

app.listen(8000, () => {
  console.log("listening 8000 port");
});
