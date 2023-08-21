import { inventory } from "../../../../components/cookApp/inventoryPage/types";
import { api_url } from "../../apiURL";

const GetCartList = async ( data:any ) => {
  let inventory = []
  await fetch( api_url + '/cart/all', {
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
    console.log(inventory)
    return inventory;  
  }

    
    export default GetCartList;