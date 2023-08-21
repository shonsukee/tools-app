const { PrismaClient } = require("@prisma/client");
const express = require("express");
const app = express();
const prisma = new PrismaClient();

app.use(express.json()); //送られてきたデータがjson形式と認識させる

// DBの全情報取得
app.post("/", async (req, res) => {
  try {
    const { user_id } = req.body;

    const cart = await prisma.cart.findMany({
      where: {
        user_id: user_id, // id: 指定したid
        already: false,
      },
    });

    //買い物リストとユーザの紐づけ
    const store_inventory = cart.map((item) => item.inventory_id);

    const inventory = await prisma.inventory.findMany({
      where: {
        id: { in: store_inventory },
      },
    });

    return res.json({ cart, inventory });
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});

module.exports = app;
