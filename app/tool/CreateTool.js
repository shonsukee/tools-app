// ルーティングモジュールを呼び出しcp
const { PrismaClient } = require("@prisma/client");
const express = require("express");
const app = express();
const prisma = new PrismaClient();

// 「/user/」にマッチする場合の処理

app.use(express.json()); //送られてきたデータがjson形式と認識させる
app.post("/", async (req, res) => {
  try {
    const { user_id, title, detail, url } = req.body; // postmanで挿入
    //schema.prismaのPostsから取得
    const tool = await prisma.tool.create({
      data: {
        user_id: user_id,
        title: title,
        detail: detail,
        url: url,
      },
    });
    return res.json(tool);
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});

// 「/user/about」にマッチする場合の処理

module.exports = app;
