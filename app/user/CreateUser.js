// ルーティングモジュールを呼び出しcp
const { PrismaClient } = require("@prisma/client");
const express = require("express");
const app = express();
const prisma = new PrismaClient();

// 「/user/」にマッチする場合の処理

app.use(express.json()); //送られてきたデータがjson形式と認識させる
app.post("/", async (req, res) => {
  try {
    const { name, email, password } = req.body; // postmanで挿入
    //schema.prismaのPostsから取得
    const posts = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: password,
      },
    });
    console.log("a");
    return res.json(posts);
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});

// 「/user/about」にマッチする場合の処理

module.exports = app;
