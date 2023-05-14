// ルーティングモジュールを呼び出しcp
const { PrismaClient } = require("@prisma/client");
const express = require("express");
const app = express();
const prisma = new PrismaClient();

// 「/ingredient/」にマッチする場合の処理

app.use(express.json()); //送られてきたデータがjson形式と認識させる
app.post("/", async (req, res) => {
  try {
    const { name, category, amount } = req.body; // postmanで挿入
    //schema.prismaのPostsから取得
    console.log(typeof amount)
    const posts = await prisma.ingredient.create({
      data: {
        name: name,
        category: category,
        amount: amount,
      },
    });
    return res.json(posts);
  } catch (err) {
    res.status(500).send('Internal Server Error');
  }

    });

// 「/ingredient/about」にマッチする場合の処理

module.exports = app;

