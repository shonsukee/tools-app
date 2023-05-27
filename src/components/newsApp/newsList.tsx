import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link } from "react-router-dom";

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
    <Container>
      <p>{load}</p>
      {articles.map((article, index) => (
        <Link
          to={`/news?url=${encodeURIComponent(
            article.url
          )}&title=${encodeURIComponent(
            article.title
          )}&urlToImage=${encodeURIComponent(article.urlToImage)}`}
          key={index}
        >
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
    </Container>
  );
}

export default NewsList;

const Container = styled.div`
  display: flex;
`;

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
