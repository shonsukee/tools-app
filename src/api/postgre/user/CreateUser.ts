const CreateUser = (data) => {
  fetch("https://toolapp-back.herokuapp.com/user/create", {
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
      localStorage.setItem("user_id", data.id);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

export default CreateUser;
