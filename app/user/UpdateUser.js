// ルーティングモジュールを呼び出しcp
const { PrismaClient } = require("@prisma/client");
const express = require("express");
const app = express();
const prisma = new PrismaClient();

// 「/user/」にマッチする場合の処理

app.use(express.json()); //送られてきたデータがjson形式と認識させる

app.put("/:id", async (req, res) => {
    const id = req.params.id;
    const { name } = req.body; // postmanで挿入
  
    //schema.prismaのPostsから取得
    const updatedPosts = await prisma.posts.update({
      where: {
        id: Number(id),
      },
      data: {
        name: name,
      },
    });
  
    return res.json(updatedPosts);
  });

module.exports = app;

