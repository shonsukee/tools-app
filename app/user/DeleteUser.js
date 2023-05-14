// ルーティングモジュールを呼び出しcp
const { PrismaClient } = require("@prisma/client");
const express = require("express");
const app = express();
const prisma = new PrismaClient();

// 「/user/」にマッチする場合の処理

app.use(express.json()); //送られてきたデータがjson形式と認識させる

app.delete("delete/:id", async (req, res) => {
  try {
    const id = req.params.id; // /:idで指定したidをparamsの中から取得
    const deletedUser = await prisma.user.delete({
      where: {
        id: Number(id), // id: 指定したid
      },
    });
    return res.json(deletedUser);
  } catch (err) {
    res.status(500).send('Internal Server Error');
  }
  });
// 「/user/about」にマッチする場合の処理

module.exports = app;

