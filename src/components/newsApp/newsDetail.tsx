import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { chat } from "../../api/gpt/chat"; // chat.js のインポート
import styled from "styled-components";

const NewsSearch = ({ title, image }: { title: string; image: string }) => {
  //エンドポイントからurl取得
  const location = useLocation();
  const { search } = location;
  const params = new URLSearchParams(search);
  const articleUrl = params.get("url");

  const [message, setMessage] = useState(""); // メッセージの状態管理用
  const [answer, setAnswer] = useState(""); // 回答の状態管理用
  const [load, setLoad] = useState("Loading...");

  // 「質問」ボタンを押したときの処理
  useEffect(() => {
    (async function () {
      setMessage(`「${articleUrl}」このURLの本文を要約して`);
    })();
  }, [articleUrl]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await chat(message);
      setAnswer(data);
    };

    if (message !== "") {
      fetchData();
    }
    localStorage.setItem("variable", answer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message]);

  // ローカルストレージに保管したい
  useEffect(() => {
    if (typeof answer === "string") {
      // 変数を読み込み
      //   const savedVariable = localStorage.getItem("variable");

      //   console.log(savedVariable);
      if (answer !== "") {
        setLoad("");
      }
    }
  }, [answer]);

  // チャットフォームの表示
  return (
    <div>
      <Image src={image} alt={title} />
      <h1>{title}</h1>
      <Link to={`${articleUrl}`} target="_blank" rel="noreferrer noopener">
        <Move>記事に移動</Move>
      </Link>
      <p>{load}</p>
      {answer && (
        <div>
          <h2>要約:</h2>
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};

export default NewsSearch;

const Image = styled.img`
  width: 100%;
  object-fit: cover;
  margin-bottom: 30px;
`;

const Move = styled.div`
  display: flex;
  justify-content: flex-end;
`;
