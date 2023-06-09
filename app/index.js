var cors = require("cors");
var express = require("express");
var app = express();
app.use(cors());

app.use("/user/create", require("./user/CreateUser.js"));
app.use("/user/find", require("./user/FindUser.js"));

app.use("/store/all", require("./store/GetStoreAll.js"));
app.use("/store/ingredient/all", require("./store/GetStoreAll.js"));

app.use("/cart/add/many", require("./cart/AddCartMany.js"));
app.use("/cart/all", require("./cart/GetCartAll.js"));

app.use("/home/tool/create", require("./tool/CreateTool.js"));
app.use("/home/tool/get", require("./tool/GetTool.js"));
app.use("/home/tool/select", require("./tool/SelectTool.js"));
app.use("/home/group/create", require("./tool/CreateGroup.js"));
app.use("/home/group/get", require("./tool/GetGroup.js"));
app.use("/home/ogp/get", require("./tool/GetOgp.js"));
app.use("/home/ref/create", require("./tool/CreateReference.js"));

app.use("/news/get", require("./news/GetNews.js"));

app.use("/gpt/chat", require("./gpt/GetChat.js"));

app.listen(8000, () => {
  console.log("listening 8000 port");
});
