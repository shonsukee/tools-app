// ルーティングモジュールを呼び出しcp
const { PrismaClient } = require("@prisma/client");
const express = require("express");
const app = express();
const prisma = new PrismaClient();

// 「/inventory/」にマッチする場合の処理

app.use(express.json()); //送られてきたデータがjson形式と認識させる

// DBの全情報取得
app.post("/", async (req, res) => {
  try {
    const { user_id } = req.body; // postmanで挿入
    console.log(user_id)
    const inventory = await prisma.inventory.findMany({
      where: {
        user_id: user_id, // id: 指定したid
      },
    });
    return res.json(inventory);
  } catch (err) {
    res.status(500).send('Internal Server Error');
  }
});

module.exports = app;

