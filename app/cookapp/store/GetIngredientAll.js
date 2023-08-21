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
    const { user_id } = req.body;

    let result = [];

    const store = await prisma.store.findMany({
      where: {
        user_id: user_id, // id: 指定したid
      },
      orderBy: {
        expiry_date: "asc",
      },
    });

    //食材を取得
    const store_inventory = store.map((item) => item.inventory_id);

    const inventory = await prisma.inventory.findMany({
      where: {
        id: { in: store_inventory },
      },
    });

    for (let store_cell of store) {
      let result_obj = {};
      console.log(store);
      let expiry_num = store_cell["inventory_id"];
      console.log(expiry_num);
      let merge_this = inventory[expiry_num];
      console.log(merge_this);
      result_obj = { ...store_cell, ...merge_this };
      result.push(result_obj);
    }

    return res.json(result);
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});

module.exports = app;
