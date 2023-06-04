const GetGroup = async (data) => {
  let groups = [];

  await fetch("http://localhost:8000/home/group/get", {
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
