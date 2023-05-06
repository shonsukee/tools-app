// ルーティングモジュールを呼び出しcp
const { PrismaClient } = require("@prisma/client");
const express = require("express");
const app = express();
const prisma = new PrismaClient();

// 「/ingredient/」にマッチする場合の処理

app.use(express.json()); //送られてきたデータがjson形式と認識させる

// DBの全情報取得
app.get("/", async (req, res) => {
  const ingredient = await prisma.ingredient.findMany();
  return res.json(ingredient);
});

module.exports = app;

