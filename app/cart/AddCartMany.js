const { PrismaClient } = require("@prisma/client");
const express = require("express");
const app = express();
const prisma = new PrismaClient();


app.use(express.json()); //送られてきたデータがjson形式と認識させる

app.post("/", async (req, res) => {
  try {
    let data
    const { user_id, lists } = req.body; // postmanで挿入

    lists.map( async(e) => {
        data =await prisma.cart.create({
        data: {
          user_id: user_id, 
          inventory_id: e,
          amount: 1,
          memo: "",
          type: true,
        }
      });
    })
    console.log(data)
    return res.json(data);
  
  } catch (err) {
  
    res.status(500).send('Internal Server Error');
  
  }
  });


module.exports = app;
