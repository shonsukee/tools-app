import React, { useState, useEffect } from "react";
import { TextField } from "@material-ui/core/";
import { Link } from "react-router-dom";
import axios from "axios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Grid } from "@mui/material";

interface Article {
  title: string;
  urlToImage: string;
  url: string;
}

const SearchTextField = ({ onSearch }) => {
  //   const [keyword, setKeyword] = useState("");
  const [articles, setArticles] = useState<Article[]>([]);
  const [load, setLoad] = useState("Loading...");
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    // テキスト取得
    const input = document.getElementById("field") as HTMLInputElement;
    input.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        const enteredText = input.value;
        const apiKey = process.env.REACT_APP_NEWS_API;
        let apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=5&apiKey=${apiKey}&q=`;
        const errorArticle = {
          title: "No matching news",
          urlToImage: "",
          url: "",
        };

        const searchTexts = enteredText
          .trim()
          .toLowerCase()
          .match(/[^\s]+/g);

        //入力されたキーワードが空白のみの場合
        if (searchTexts === null) {
          setArticles([errorArticle]);
        }

        apiUrl += searchTexts;
        axios
          .get(apiUrl)
          .then((response) => {
            const articles = response.data.articles; // レスポンスから記事データを取得

            // レスポンスが配列であることを確認してから処理を行う
            if (Array.isArray(articles)) {
              const formattedArticles = articles.map((article) => {
                return {
                  title: article.title,
                  urlToImage: article.urlToImage,
                  url: article.url,
                };
              });

              setArticles(formattedArticles);
            } else {
              setArticles([errorArticle]);
            }
          })

          .then(() => {
            setLoad("");
          })
          .catch((error) => {
            console.log(error);
            setArticles([errorArticle]);
          });
        onSearch(true);
      }
      if (articles.length !== 0) {
        setFlag(true);
      } else {
        setFlag(false);
      }
    });
  }, [articles.length, onSearch]);

  return (
    <>
      <TextField
        id="field"
        color="secondary"
        variant="outlined"
        label="enter keywords"
        // onChange={(e) => setKeyword(e.target.value)}
      />
      {!flag && articles.map((article) => article.title)}
      {flag && (
        <Grid container rowSpacing={1} columnSpacing={{ sm: 2, md: 3, lg: 4 }}>
          {articles.map((article, index) => (
            <Grid item sm={12} md={6} lg={3} key={index}>
              <Link
                to={`/news?url=${encodeURIComponent(
                  article.url
                )}&title=${encodeURIComponent(
                  article.title
                )}&urlToImage=${encodeURIComponent(article.urlToImage)}`}
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
                    <CardContent>
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
      )}
    </>
  );
};

export default SearchTextField;
