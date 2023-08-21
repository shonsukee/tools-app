import { api_url } from "../postgre/apiURL";

const GetRecipeRanking = async (data) =>{
  let inventory = []
  await fetch(api_url+'/recipe/all', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'mode': 'no-cors',
  },
  body: JSON.stringify(data),
  })
  .then((response) => response.json())
  .then((data) => {
    inventory = data;
  })
  .catch((error) => {
    console.error('Error:', error);
  });
  return inventory;  
}

  
  export default GetRecipeRanking;