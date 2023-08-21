// ルーティングモジュールを呼び出しcp
const express = require("express");
const app = express();

app.use(express.json()); //送られてきたデータがjson形式と認識させる
app.post("/", async (req, res) => {
  try {
    const { recipe_id } = req.body; // postmanで挿入

    //楽天ランキングAPIからレシピを取得
    fetch(
      `https://app.rakuten.co.jp/services/api/Recipe/CategoryRanking/20170426?applicationId=1047824584251125326&categoryId=${recipe_id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          mode: "no-cors",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        return res.json(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});

module.exports = app;
