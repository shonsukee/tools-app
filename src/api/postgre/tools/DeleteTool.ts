const DeleteTool = async (data) => {
  await fetch(process.env.REACT_APP_API_URL + "/home/tool/delete", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then(() => {
      console.log("Success");
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

export default DeleteTool;
