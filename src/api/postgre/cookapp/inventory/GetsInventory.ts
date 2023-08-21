import { inventory } from "../../../../components/cookApp/inventoryPage/types";

const GetsInventory = async ( data:any ): Promise<inventory[]> =>{
    let inventory = []
    await fetch('http://localhost:8000/inventory/all', {
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