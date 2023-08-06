const express = require("express");
const GetNewsBatchHandler = require("./GetNewsBatchHandler");
const app = express();

app.use(express.json()); // 送られてきたデータがJSON形式と認識させる

app.post("/", async (req, res) => {
  const { query } = req.body;

  if (!query) {
    res.status(400).send("No query provided");
    return;
  }

  await GetNewsBatchHandler(query, (error, news) => {
    if (error) {
      console.error("Error occurred:", error);
      res.status(500).json({ error: "internal Server Error" });
    } else {
      res.json({
        articles: news.data.articles,
      });
    }
  });
});

module.exports = app;
