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
    const store = await prisma.store.findMany({
      where: {
        user_id: user_id, // id: 指定したid
        
        },
    });

    const store_ingredient = store.map(item => item.inventory_id);

    const ingredient = await prisma.inventory.findMany({
      where: {
        id: {in: store_ingredient},
        type: "野菜"
      },
    });
    return res.json({store, ingredient});

  } catch (err) {
    res.status(500).send('Internal Server Error');
  }
});

module.exports = app;

