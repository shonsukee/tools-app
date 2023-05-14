// ルーティングモジュールを呼び出しcp
const { PrismaClient } = require("@prisma/client");
const express = require("express");
const app = express();
const prisma = new PrismaClient();


app.use(express.json()); //送られてきたデータがjson形式と認識させる
app.post("/", async (req, res) => {
  try {
    const { name, category, amount, user_id} = req.body; // postmanで挿入
    //schema.prismaのPostsから取得
    console.log(typeof amount)
    const inventories = await prisma.inventory.create({
      data: {
        user_id: user_id,
        name: name,
        category: category,
        amount: amount,
      },
    });
    return res.json(inventories);
  } catch (err) {
    res.status(500).send('Internal Server Error');
  }

    });


module.exports = app;

