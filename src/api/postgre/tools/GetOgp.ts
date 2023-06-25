const GetOgp = async (data) => {
  let ogp = [];

  await fetch("http://localhost:8000/home/ogp/get", {
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
      ogp = data;
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  console.log("======ts========");
  console.log(ogp.length);

  return ogp;
};

export default GetOgp;
