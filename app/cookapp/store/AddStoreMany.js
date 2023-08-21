const { PrismaClient } = require("@prisma/client");
const express = require("express");
const app = express();
const prisma = new PrismaClient();

//storeデータをcartデータに変更する
app.use(express.json()); //送られてきたデータがjson形式と認識させる

app.post("/", async (req, res) => {
  try {
    const { user_id, lists } = req.body; // postmanで挿入
    const currentTime = new Date();

    let data = [];
    for (var list of lists) {
      console.log(list);
      const updatestore = await prisma.cart.updateMany({
        where: {
          inventory_id: list["inventory_id"],
        },
        data: {
          purchase_date: currentTime,
          already: true,
        },
      });

      await prisma.store.create({
        data: {
          user_id: user_id,
          inventory_id: list["inventory_id"],
          amount: Number(list["amount"]),
          memo: list["memo"],
          create_date: currentTime,
          expiry_date: list["expiry_date"],
          exist: true,
        },
      });
    }
    return res.json(data);
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});

module.exports = app;
