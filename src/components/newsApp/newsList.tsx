import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Grid } from "@mui/material";
import "./news.css";

interface Article {
  title: string;
  urlToImage: string;
  url: string;
}

function NewsList() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [load, setLoad] = useState("Loading...");

  useEffect(() => {
    const apiKey = process.env.REACT_APP_NEWS_API;
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}&pageSize=5`;

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
              )}&urlToImage=${encodeURIComponent(article.urlToImage)}`}
              className="underline"
            >
              <p>{load}</p>
              <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    src={
                      article.urlToImage ||
                      "https://dummyimage.com/300x200/ccc/fff.png?text=No+Image"
                    }
                    alt={article.title}
                  />
                  <CardContent className="box">
                    <Typography gutterBottom variant="h5" component="div">
                      {article.title}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default NewsList;
