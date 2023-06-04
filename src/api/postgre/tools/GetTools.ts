const GetTools = async (data) => {
  let tools = [];
  await fetch("http://localhost:8000/home/tool/get", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      mode: "no-cors",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
      tools = data;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  return tools;
};

export default GetTools;
