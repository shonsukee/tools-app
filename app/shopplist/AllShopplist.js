const { PrismaClient } = require("@prisma/client");
const express = require("express");
const app = express();
const prisma = new PrismaClient();


app.use(express.json()); //送られてきたデータがjson形式と認識させる

// DBの全情報取得
app.post("/", async (req, res) => {
  try {
    const { user_id } = req.body; // postmanで挿入
    console.log(user_id)
    const shoplist = await prisma.shoplist.findMany({
      where: {
        user_id: user_id, // id: 指定したid
      },
    });
    return res.json(shoplist);
  } catch (err) {
    res.status(500).send('Internal Server Error');
  }
});

module.exports = app;