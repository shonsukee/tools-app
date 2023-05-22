import React, { useState, useEffect } from "react";
import { TextField } from "@material-ui/core/";
import { Link } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

interface Article {
  title: string;
  urlToImage: string;
  url: string;
}

const SearchTextField = ({ onSearch }) => {
  //   const [keyword, setKeyword] = useState("");
  const [articles, setArticles] = useState<Article[]>([]);
  const [load, setLoad] = useState("Loading...");

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
    });
  }, [onSearch]);

  return (
    <>
      <TextField
        id="field"
        color="secondary"
        variant="outlined"
        label="enter keywords"
        // onChange={(e) => setKeyword(e.target.value)}
      />
      {articles.map((article, index) => (
        <Link
          to={`/news?url=${encodeURIComponent(
            article.url
          )}&title=${encodeURIComponent(
            article.title
          )}&urlToImage=${encodeURIComponent(article.urlToImage)}`}
          key={index}
        >
          {load}
          <Articles className="App-frame">
            <Image
              src={
                article.urlToImage ||
                "https://dummyimage.com/300x200/ccc/fff.png?text=No+Image"
              }
              alt={article.title}
            />
            <Title>{article.title}</Title>
          </Articles>
        </Link>
      ))}
    </>
  );
};

export default SearchTextField;

const Articles = styled.div`
  padding: 10px;
  color: black;
  margin-bottom: 20px;
  cursor: pointer;
  box-sizing: border-box;

  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    width: 48%;
  }

  @media (max-width: 992px) {
    width: 31%;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  margin-bottom: 10px;
`;

const Title = styled.h2`
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 10px;
`;
