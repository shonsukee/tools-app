import { inventory } from "../../../components/inventory/types";

const GetsInventory = async ( data:any ): Promise<inventory[]> =>{
    let inventory = []
    await fetch('http://localhost:8000/store/all', {
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
      inventory = data;
    })
    .catch((error) => {
      console.error('Error:', error);
    });
    return inventory;  
  }

    
    export default GetsInventory;