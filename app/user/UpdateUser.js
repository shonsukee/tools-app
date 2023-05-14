// ルーティングモジュールを呼び出しcp
const { PrismaClient } = require("@prisma/client");
const express = require("express");
const app = express();
const prisma = new PrismaClient();

// 「/user/」にマッチする場合の処理

app.use(express.json()); //送られてきたデータがjson形式と認識させる

app.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { name } = req.body; // postmanで挿入
  
    //schema.prismaのPostsから取得
    const updatedPosts = await prisma.user.update({
      where: {
        id: Number(id),
      },
      data: {
        name: name,
      },
    });
    return res.json(updatedPosts);
  } catch (err) {
    res.status(500).send('Internal Server Error');
  }
  });

module.exports = app;

