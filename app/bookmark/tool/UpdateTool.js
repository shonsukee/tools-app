// ルーティングモジュールを呼び出しcp
const { PrismaClient } = require("@prisma/client");
const express = require("express");
const app = express();
const prisma = new PrismaClient();

// 「/user/」にマッチする場合の処理

app.use(express.json()); //送られてきたデータがjson形式と認識させる
app.put("/", async (req, res) => {
  try {
    const { id, title, detail, url } = req.body;
    const tool = await prisma.tool.update({
      where: {
        id: id,
      },
      data: {
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
