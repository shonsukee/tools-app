const { PrismaClient } = require("@prisma/client");
const express = require("express");
const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.post("/", async (req, res) => {
  try {
    const { group_id, tool_id } = req.body;

    const existingRef = await prisma.reference.findMany({
      where: {
        group_id: group_id,
        tool_id: tool_id,
      },
    });
    if (existingRef.length !== 0) {
      return res.status(409).send("This combination already exists.");
    }

    const reference = await prisma.reference.create({
      data: {
        tool_id: tool_id,
        group_id: group_id,
      },
    });

    return res.json(reference);
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});

module.exports = app;
