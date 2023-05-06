
const GetsIngredient1 = async () =>{
    let ingredient = []
    await fetch('https://api.openai.com/v1/completions', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'mode': 'no-cors',
      'Authorization':'Bearer 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',
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

    
    export default GetsIngredient1;