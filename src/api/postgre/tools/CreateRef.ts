const GetGroup = async (data) => {
  let reference = [];

  console.log(data);
  await fetch("http://localhost:8000/home/ref/create", {
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
      reference = data;
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  return reference;
};

export default GetGroup;
