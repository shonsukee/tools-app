import { inventory } from "../../../../components/cookApp/inventoryPage/types";
import { api_url } from "../../apiURL";

const GetsInventory = async ( data:any ): Promise<inventory[]> =>{
    let inventory = []
    console.log(api_url)
    await fetch(api_url+'/store/ingredient/all', {
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