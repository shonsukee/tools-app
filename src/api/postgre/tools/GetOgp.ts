const GetOgp = async (data) => {
  let ogp = [];

  await fetch(process.env.REACT_APP_API_URL + "/home/ogp/get", {
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

  return ogp;
};

export default GetOgp;
