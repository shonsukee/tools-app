const express = require("express");
const app = express();
const axios = require("axios");

app.use(express.json());

app.post("/", async (req, res) => {
  const API_URL = "https://api.openai.com/v1/";
  const MODEL = "gpt-3.5-turbo";
  const API_KEY = process.env.REACT_APP_GPT_API;

  const { prompt } = req.body;

  if (!prompt) {
    return res.json("No prompt provided");
  }

  try {
    const response = await axios.post(
      `${API_URL}chat/completions`,
      {
        model: MODEL,
        max_tokens: 1,
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );

    console.log(response.data.choices[0].message.content);
    // クライアントに回答を返す
    return res.json(response.data.choices[0].message.content);
  } catch (error) {
    return res.json(error);
  }
});

module.exports = app;
