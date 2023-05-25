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
  image: string;
  url: string;
}

function NewsList() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [load, setLoad] = useState("Loading...");

  useEffect(() => {
    const apiKey = process.env.REACT_APP_NEWS_API;
    // const apiUrl = `https://gnews.io/api/v4/search?q=Google&apiKey=${apiKey}`;
    // const apikey = "8b05eaea8aa232f3a935cb58a28c44a3";
    var apiUrl = `https://gnews.io/api/v4/search?q=google&lang=en&country=us&max=10&apikey=${apiKey}`;

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
              <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    src={
                      article.image ||
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
