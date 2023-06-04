import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Grid } from "@mui/material";
import "./news.css";

interface Article {
  title: string;
  image: string;
  url: string;
}

function NewsList() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [load, setLoad] = useState("Loading...");

  useEffect(() => {
    const apiKey = process.env.REACT_APP_NEWS_API;
    var apiUrl = `https://gnews.io/api/v4/search?q=google&lang=ja&max=8&apikey=${apiKey}`;

    axios
      .get(apiUrl)
      .then((response) => {
        setArticles(response.data.articles);
        console.log(response.data.articles);
      })
      .then(() => {
        setLoad("");
      });
  }, []);

  return (
    <>
      <p>{load}</p>
      <Grid container rowSpacing={1} columnSpacing={{ sm: 2, md: 3, lg: 4 }}>
        {articles.map((article, index) => (
          <Grid item sm={12} md={6} lg={3} key={index}>
            <Link
              to={`/news?url=${encodeURIComponent(
                article.url
              )}&title=${encodeURIComponent(
                article.title
              )}&image=${encodeURIComponent(article.image)}`}
              className="underline"
            >
              <p>{load}</p>
              <div className="App-frame">
                <img
                  width="100%"
                  height="170px"
                  object-fit="cover"
                  src={
                    article.image ||
                    "https://dummyimage.com/300x200/ccc/fff.png?text=No+Image"
                  }
                  alt={article.title}
                />
                <div className="App-title-frame">
                  <p className="App-title">{article.title}</p>
                </div>
              </div>
            </Link>
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default NewsList;
