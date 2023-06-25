import React, { useState, useEffect } from "react";
import { TextField } from "@material-ui/core/";
import { Grid } from "@mui/material";
import GetNews from "../../api/news/GetNews";
import { motion } from "framer-motion";
import clsx from "clsx";
import { IconContext } from "react-icons";

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

const SearchTextField = ({ onSearch }) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [flag, setFlag] = useState(false);
  const isPhone = useWindowSize();

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
              query: searchTexts,
            });
            setArticles(news);
            setFlag(true);
          })();
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
      )}
    </>
  );
};

export default SearchTextField;
