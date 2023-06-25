import React, { useState, useEffect } from "react";
import { TextField } from "@material-ui/core/";
import { Link } from "react-router-dom";
import { Grid } from "@mui/material";
import GetNews from "../../api/news/GetNews";

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
        const errorArticle = {
          title: "No matching news",
          image: "",
          url: "",
        };

        const searchTexts = enteredText
          .trim()
          .toLowerCase()
          .replace(/\s+/g, "+")
          .match(/[^\s]+/g);

        //入力されたキーワードが空白のみの場合
        if (searchTexts === null) {
          setArticles([errorArticle]);
        } else {
          (async function () {
            const news = await GetNews({
              query: "google",
            });
            setArticles(news);
            console.log(news);
            setLoad("");
            setFlag(true);
          })();
          console.log(articles.length);
          console.log(articles);
          if (articles.length !== 0) {
            setFlag(true);
          } else {
            setFlag(false);
          }
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
                <div className="App-frame">
                  <div className="img-size">
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
                  </div>
                  <div className="App-title-frame">
                    <p className="App-title">{article.title}</p>
                  </div>
                </div>
              </Link>
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
};

export default SearchTextField;
