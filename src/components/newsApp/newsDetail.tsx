import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import GetChat from "../../api/gpt/GetChat";
import styled from "styled-components";
import { Bars } from "react-loader-spinner";

const NewsSearch = ({ title, image }: { title: string; image: string }) => {
  //エンドポイントからurl取得
  const location = useLocation();
  const { search } = location;
  const params = new URLSearchParams(search);
  const articleUrl = params.get("url");

  const [message, setMessage] = useState(""); // メッセージの状態管理用
  const [answer, setAnswer] = useState<string>(""); // 回答の状態管理用
  const [load, setLoad] = useState(true);

  // ニュースを要約するプロンプトを送信
  useEffect(() => {
    (async function () {
      setMessage(`${title}について教えて`);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // メッセージがセットされたらChatGPTに投げる
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await GetChat({
          prompt: message,
        });
        if (data !== "No prompt provided") {
          setLoad(false);
          setAnswer(data);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchData();
  }, [message]);

  // ローディング
  //   useEffect(() => {
  //     if (answer !== "") {
  //       setLoad(true);
  //     }
  //   }, [answer]);

  // チャットフォームの表示
  return (
    <div>
      <Image src={image} alt={title} />
      <h1>{title}</h1>
      <Link to={`${articleUrl}`} target="_blank" rel="noreferrer noopener">
        <Move>記事に移動</Move>
      </Link>

      {load ? (
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
          <p>要約中</p>
        </Loading>
      ) : (
        <div>
          {answer && (
            <div>
              <h2>要約:</h2>
              <p>{answer}</p>
            </div>
          )}
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
const Loading = styled.div`
  display: flex;
  opacity: 0.2;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
