const { PrismaClient } = require("@prisma/client");
const express = require("express");
const app = express();
const prisma = new PrismaClient();


app.use(express.json()); //送られてきたデータがjson形式と認識させる
app.post("/", async (req, res) => {
  try {
    const { lists } = req.body; // postmanで挿入
    //送られてきたデータの一括追加
    const inventories = await prisma.inventory.createMany({
      data: lists,
  });
    return res.json(inventories);
  } catch (err) {
    res.status(500).send('Internal Server Error');
  }

    });


module.exports = app;
