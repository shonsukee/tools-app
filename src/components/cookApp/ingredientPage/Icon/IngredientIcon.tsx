import "./IngredientIcon.css"
import { MdFoodBank } from "react-icons/md";
import { IconContext } from 'react-icons'

const InventoryIcon = (props) =>{
    return(       
        <div className="Inventory-frame">
            <div className="Inventory-Icon-frame">
                <IconContext.Provider value={{size:"100px"}}>
                    <MdFoodBank/>
                </IconContext.Provider>
            </div>
            <div className="Inventory-title-frame">
                <p className="Inventory-title">{props.name}</p>
            </div>
            <div className="Inventory-text-frame">
                <p className="Inventory-text">
                    {props.category}
                </p>
            </div>
        </div>
    )
}


export default InventoryIcon