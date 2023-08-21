// ルーティングモジュールを呼び出しcp
const { PrismaClient } = require("@prisma/client");
const express = require("express");
const app = express();
const prisma = new PrismaClient();

app.use(express.json()); //送られてきたデータがjson形式と認識させる

// idを指定して情報取得
app.post("/", async (req, res) => {
  //条件に合うデータをすべて見つける
  try {
    const { email } = req.body;
    console.log(email);
    console.log(typeof email);
    const post = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    return res.json(post);
    //条件に合うものがないとき
  } catch (err) {
    return res.json(err);
  }
});

module.exports = app;
