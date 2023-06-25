import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import styled from "styled-components";
import "./news.css";
import { motion } from "framer-motion";
import { IconContext } from "react-icons";
import { Bars } from "react-loader-spinner";
import GetNews from "../../api/news/GetNews";
import clsx from "clsx";

interface Article {
  title: string;
  image: string;
  url: string;
}

// スマホの時はBottomNavi
const useWindowSize = (): boolean => {
  const [size, setSize] = useState([window.innerWidth, window.innerHeight]);
  useEffect(() => {
    const updateSize = (): void => {
      setSize([window.innerWidth, window.innerHeight]);
    };
    window.addEventListener("resize", updateSize);
    updateSize();
  }, []);

  return size[0] <= 500;
};

function NewsList() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [load, setLoad] = useState("Loading...");
  const isPhone = useWindowSize();

  useEffect(() => {
    (async function () {
      const news = await GetNews({
        query: "google",
      });
      setArticles(news);
      console.log(news);
      setLoad("");
    })();
  }, []);

  return (
    <>
      <Loading>
        {load && (
          <Loading>
            <Bars
              height="80"
              width="80"
              color="#"
              ariaLabel="bars-loading"
              wrapperStyle={{}}
              wrapperClass="#C0C0C0"
              visible={true}
            />
            <p>検索中</p>
          </Loading>
        )}
      </Loading>
      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ sm: 2, md: 3, lg: 4 }}
        style={{ justifyContent: "center" }}
      >
        {articles.map((article, index) => (
          <Grid item sm={12} md={6} lg={3} key={index}>
            <motion.div
              className={clsx(isPhone && "App-Phone", "App-frame")}
              whileHover={{ scale: [null, 1.13, 1.03] }}
              transition={{ duration: 0.23 }}
            >
              <a
                href={`/news?url=${encodeURIComponent(
                  article.url
                )}&title=${encodeURIComponent(
                  article.title
                )}&image=${encodeURIComponent(article.image)}`}
                key={index}
              >
                <div className="Icon-frame">
                  <IconContext.Provider value={{ size: "100%" }}>
                    <img
                      margin-top="50px"
                      width="100%"
                      object-fit="cover"
                      src={
                        article.image ||
                        "https://dummyimage.com/300x200/ccc/fff.png?text=No+Image"
                      }
                      alt={article.title}
                    />
                  </IconContext.Provider>
                </div>
                <div className="App-title-frame">
                  <p className="App-title">{article.title}</p>
                </div>
              </a>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default NewsList;

const Loading = styled.div`
  display: flex;
  opacity: 0.2;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
