const GetNews = async (data) => {
  let news = [];

  await fetch(process.env.REACT_APP_API_URL + "/news/get", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
      news = data.articles;
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  return news;
};

export default GetNews;
