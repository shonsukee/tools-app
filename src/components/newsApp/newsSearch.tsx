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
  image: string;
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
        let apiUrl = `https://gnews.io/api/v4/search?lang=en&country=us&max=10&apikey=${apiKey}&q=`;

        const errorArticle = {
          title: "No matching news",
          image: "",
          url: "",
        };

        const searchTexts = enteredText
          .trim()
          .toLowerCase()
          .match(/[^\s]+/g);

        //入力されたキーワードが空白のみの場合
        if (searchTexts === null) {
          setArticles([errorArticle]);
        } else {
          apiUrl += searchTexts;
          axios
            .get(apiUrl)
            .then((response) => {
              const articles = response.data.articles; // レスポンスから記事データを取得
              // レスポンスが配列であることを確認してから処理を行う
              if (Array.isArray(articles)) {
                setArticles(articles);
                setFlag(true);
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
        console.log(articles.length);
        if (articles.length !== 0) {
          setFlag(true);
        } else {
          setFlag(false);
        }
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <TextField
        id="field"
        color="secondary"
        variant="outlined"
        label="enter keywords"
        // onChange={(e) => setKeyword(e.target.value)}
      />
      <div>{!flag && articles.map((article) => article.title)}</div>
      {flag && (
        <Grid container rowSpacing={1} columnSpacing={{ sm: 2, md: 3, lg: 4 }}>
          {articles.map((article, index) => (
            <Grid item sm={12} md={6} lg={3} key={index}>
              <Link
                to={`/news?url=${encodeURIComponent(
                  article.url
                )}&title=${encodeURIComponent(
                  article.title
                )}&image=${encodeURIComponent(article.image)}`}
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
