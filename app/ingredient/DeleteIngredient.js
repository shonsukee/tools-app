// ルーティングモジュールを呼び出しcp
const { PrismaClient } = require("@prisma/client");
const express = require("express");
const app = express();
const prisma = new PrismaClient();

// 「/ingredient/」にマッチする場合の処理

app.use(express.json()); //送られてきたデータがjson形式と認識させる

app.delete("delete/:id", async (req, res) => {
    const id = req.params.id; // /:idで指定したidをparamsの中から取得
    const deletedIngredient = await prisma.ingredient.delete({
      where: {
        id: Number(id), // id: 指定したid
      },
    });
    return res.json(deletedIngredient);
  });
// 「/ingredient/about」にマッチする場合の処理

module.exports = app;

