const { PrismaClient } = require("@prisma/client");
const express = require("express");
const app = express();
const prisma = new PrismaClient();

app.use(express.json()); //送られてきたデータがjson形式と認識させる
app.delete("/", async (req, res) => {
  try {
    const { id } = req.body;
    await prisma.tool.delete({
      where: {
        id: id,
      },
    });
    return res.json("Delete successfully");
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});

module.exports = app;
