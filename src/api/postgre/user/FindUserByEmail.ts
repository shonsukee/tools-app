import { UserForm } from "../../../components/Login/types";

const FindUserByEmail = async (email): Promise<UserForm[]> => {
  let user = [];
  await fetch(process.env.REACT_APP_API_URL + "/user/find", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      mode: "no-cors",
    },
    body: JSON.stringify({ email: email }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
      localStorage.setItem("user_id", data.id);
      user = data;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  return user;
};

export default FindUserByEmail;
