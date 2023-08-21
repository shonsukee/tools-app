// ルーティングモジュールを呼び出しcp
const { PrismaClient } = require("@prisma/client");
const express = require("express");
const app = express();
const prisma = new PrismaClient();

// 「/user/」にマッチする場合の処理

app.use(express.json()); //送られてきたデータがjson形式と認識させる
app.post("/", async (req, res) => {
  try {
    const { user_id, group_name } = req.body; // postmanで挿入
    //schema.prismaのPostsから取得
    const group = await prisma.group.create({
      data: {
        user_id: user_id,
        group_name: group_name,
      },
    });
    return res.json(group);
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});

// 「/user/about」にマッチする場合の処理

module.exports = app;
