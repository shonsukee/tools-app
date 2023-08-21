const GetGroup = async (data) => {
  let groups = [];
  await fetch(process.env.REACT_APP_API_URL + "/home/group/get", {
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
      groups = data;
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  return groups;
};

export default GetGroup;
