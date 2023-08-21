const { PrismaClient } = require("@prisma/client");
const express = require("express");

const app = express();
const prisma = new PrismaClient();
app.use(express.json());
//送られてきたデータがjson形式と認識させる

app.post("/", async (req, res) => {
  try {
    const { user_id, data } = req.body;
    const currentTime = new Date();

    console.log(data);

    const inventory = await prisma.inventory.create({
      data: {
        name: data["name"],
        category: data["category"],
        is_ingredient: data["is_ingredient"],
        unit: data["unit"],
        edible: data["edible"],
      },
    });

    //作成した在庫と保存テーブル紐づけ
    const inventory_id = inventory["id"];

    const store = await prisma.store.create({
      data: {
        user_id: user_id,
        inventory_id: inventory_id,
        amount: data["amount"],
        memo: data["memo"],
        exist: true,
        create_date: currentTime,
        expiry_date: data["expiry_date"],
      },
    });

    console.log(store);
    return res.json(store);
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});

module.exports = app;
