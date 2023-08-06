const GetChat = async (data) => {
  let query;
  console.log(data);
  await fetch(process.env.REACT_APP_API_URL + "/gpt/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
      query = data;
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  return query;
};

export default GetChat;
