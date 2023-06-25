const express = require("express");
const GetNewsBatchHandler = require("./GetNewsBatchHandler");
const app = express();

app.use(express.json()); // 送られてきたデータがJSON形式と認識させる

// idを指定して情報取得
app.post("/", async (req, res) => {
  const { query } = req.body;

  if (!query) {
    res.status(400).send("No query provided");
    return;
  }

  await GetNewsBatchHandler(query, (error, news) => {
    if (error) {
      // エラーハンドリングの処理を実装する
      console.error("Error occurred:", error);
      // エラーレスポンスなど必要な処理を行う
      res.status(500).json({ error: "internal Server Error" });
    } else {
      // 正常なレスポンスの処理を実装する
      // 必要な処理を行う
      res.json({
        articles: news.data.articles,
      });
    }
  });
});

module.exports = app;
