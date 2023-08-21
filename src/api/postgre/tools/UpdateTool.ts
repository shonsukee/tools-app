type Tool = {
  id: number;
  title: string;
  detail: string;
  url: string;
};

const UpdateTool = async (data: Tool) => {
  await fetch(process.env.REACT_APP_API_URL + "/home/tool/update", {
    method: "UPDATE",
    headers: {
      "Content-Type": "application/json",
      mode: "no-cors",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      response.json();
      console.log("Success");
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

export default UpdateTool;
