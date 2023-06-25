// ルーティングモジュールを呼び出しcp
const { PrismaClient } = require("@prisma/client");
const express = require("express");
const app = express();
const prisma = new PrismaClient();

// 「/user/」にマッチする場合の処理

app.use(express.json()); //送られてきたデータがjson形式と認識させる

// idを指定して情報取得
app.post("/", async (req, res) => {
  //条件に合うデータをすべて見つける
  try {
    // referenceテーブルからtool_id取得
    const { user_id, group_id } = req.body;
    let tools;
    if (group_id === "0" || group_id === undefined) {
      tools = await prisma.tool.findMany({
        where: {
          user_id: user_id,
        },
      });
    } else {
      const reference = await prisma.reference.findMany({
        where: {
          group_id: group_id,
        },
        select: {
          tool_id: true,
        },
      });

      const toolIds = reference.map((item) => item.tool_id); // 取得したreferenceのtool_idを配列として取得
      tools = await prisma.tool.findMany({
        where: {
          id: {
            in: toolIds, // toolIdsに一致するtoolの要素を取得
          },
        },
        select: {
          title: true, // 取得するフィールドを指定
          detail: true,
          url: true,
          ogp: true,
        },
      });
    }
    return res.json(tools);
    //条件に合うものがないとき
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});

module.exports = app;
