import { ingredient } from "../../../components/cookApp/types";

const GetsIngredient = async ( data:any ): Promise<ingredient[]> =>{
    let ingredient = []
    await fetch('http://localhost:8000/store/ingredient/all', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'mode': 'no-cors',
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Success:', data);
      ingredient = data;
    })
    .catch((error) => {
      console.error('Error:', error);
    });
    return ingredient;  
  }

    
    export default GetsIngredient;