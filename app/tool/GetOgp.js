// ルーティングモジュールを呼び出しcp
const express = require("express");
const app = express();
const { JSDOM } = require("jsdom");
const axios = require("axios");

// 「/user/」にマッチする場合の処理

app.use(express.json()); //送られてきたデータがjson形式と認識させる

// idを指定して情報取得
app.post("/", async (req, res) => {
  const { url: targetUrls } = req.body;

  if (!targetUrls) {
    res.status(400).send("No URL provided");
    return;
  }

  try {
    const headers = { "User-Agent": "bot" };
    const response = await axios.get(targetUrls, { headers: headers });
    const html = response.data;
    const dom = new JSDOM(html);
    const meta = dom.window.document.head.querySelectorAll("meta");
    const ogp = extractOgp(Array.from(meta));

    const image = ogp["og:image"];
    return res.json(image);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
});

module.exports = app;

function extractOgp(metaElements) {
  const ogp = metaElements
    .filter((element) => element.getAttribute("property") === "og:image")
    .reduce((previous, current) => {
      const property = current.getAttribute("property")?.trim();
      if (!property) return previous;
      const content = current.getAttribute("content");
      previous[property] = content;
      return previous;
    }, {});

  return ogp;
}
