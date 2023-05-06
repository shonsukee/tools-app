import { ingredient } from "../../../components/cookApp/types";

const GetsIngredient = async (): Promise<ingredient[]> =>{
    let ingredient = []
    await fetch('http://localhost:8000/ingredient/all', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'mode': 'no-cors',
    },
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