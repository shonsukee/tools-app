import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { chat } from "../../api/gpt/chat"; // chat.js のインポート
import styled from "styled-components";

const NewsDetail = ({
  title,
  urlToImage,
}: {
  title: string;
  urlToImage: string;
}) => {
  //エンドポイントからurl取得
  const location = useLocation();
  const { search } = location;
  const params = new URLSearchParams(search);
  const articleUrl = params.get("url");

  const [message, setMessage] = useState(""); // メッセージの状態管理用
  const [answer, setAnswer] = useState(""); // 回答の状態管理用

  // 「質問」ボタンを押したときの処理
  useEffect(() => {
    (async function () {
      setMessage(`「${articleUrl}」このURLの本文を要約して`);
    })();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const data = await chat(message);
      setAnswer(data);
    };

    if (message !== "") {
      fetchData();
    }
    // localStorage.setItem("variable", answer);
  }, [message]);

  // ローカルストレージに保管したい
  //   useEffect(() => {
  //     if (typeof answer === "string") {
  //       // 変数を読み込み
  //       const savedVariable = localStorage.getItem("variable");

  //       console.log(savedVariable);
  //     }
  //   }, [answer]);

  // チャットフォームの表示
  return (
    <div>
      <Image src={urlToImage} alt={title} />
      <h1>{title}</h1>
      <Link to={`${articleUrl}`} target="_blank" rel="noreferrer noopener">
        <Move>記事に移動</Move>
      </Link>
      {answer && (
        <div>
          <h2>要約:</h2>
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};

export default NewsDetail;

const Image = styled.img`
  width: 100%;
  object-fit: cover;
  margin-bottom: 10px;
`;

const Move = styled.div`
  display: flex;
  justify-content: flex-end;
`;
