// ルーティングモジュールを呼び出しcp
const { PrismaClient } = require("@prisma/client");
const express = require("express");
const app = express();
const prisma = new PrismaClient();

// 「/user/」にマッチする場合の処理

app.use(express.json()); //送られてきたデータがjson形式と認識させる

// idを指定して情報取得
app.get("/:id", async (req, res) => {
    const id = req.params.id; // /:idで指定したidをparamsの中から取得
    const post = await prisma.posts.findUnique({
      where: {
        id: Number(id), // id: 指定したid
      },
    });
    return res.json(post);
  });
  
module.exports = app;

