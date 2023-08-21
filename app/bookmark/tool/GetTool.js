// ルーティングモジュールを呼び出しcp
const { PrismaClient } = require("@prisma/client");
const express = require("express");
const app = express();
const prisma = new PrismaClient();

// 「/user/」にマッチする場合の処理

app.use(express.json()); //送られてきたデータがjson形式と認識させる

// idを指定して情報取得
app.post("/", async (req, res) => {
  //条件に合うデータをすべて見つける
  try {
    const { user_id } = req.body;
    //schema.prismaのPostsから取得
    const tool = await prisma.tool.findMany({
      where: {
        user_id: user_id,
      },
      orderBy: {
        id: "desc",
      },
    });
    return res.json(tool);
    //条件に合うものがないとき
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});

module.exports = app;
