import express from "express";
import fetch from "isomorphic-fetch";
import fs from "fs";

const app = express();

app.get(
  "/news/scraping",
  async (req: express.Request, res: express.Response): Promise<void> => {
    const { request_url, filename } = req.query;
    const downloadDir = "download";
    try {
      const response = await fetch(request_url);
      const savePath = `${downloadDir}/${filename}`;
      response.body.pipe(fs.createWriteStream(savePath));
      res.send("画像を保存しました。");
    } catch (error) {
      console.error(error);
      res.send("エラーが発生しました。");
    }
  }
);
