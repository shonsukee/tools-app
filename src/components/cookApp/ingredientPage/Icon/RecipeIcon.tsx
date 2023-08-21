import "./RecipeIcon.css"
import { MdFoodBank } from "react-icons/md";
import { IconContext } from 'react-icons'


const RecipeIcon = (props) =>{

    //レシピと在庫のリスト取得
    const recipe_material = props["recipe"]["recipeMaterial"];
    const ingredients = props["ingredient"];
    let ingredientColorMap = {}
    for(var materials of recipe_material){
        ingredientColorMap[materials] = false
        for(var ingredient of ingredients){
           /*  for(var material of materials){
                 if(ingredient.includes(material)){
                    ingredientColorMap[material] = true
                } 
                console.log(material)
            }
            console.log(ingredient["name"]) */
            console.log(materials)
        }
        console.log(ingredientColorMap)
    }

    return(       
        <div className="Recipe-frame">
            <div className="Recipe-Icon-frame">
                <img src={props["recipe"]["foodImageUrl"]} style={{width:"100%"}}></img>
            </div>
            <div className="Recipe-title-frame">
                <p className="Recipe-title">{props["recipe"]["recipeTitle"]}</p>

            </div>
           {/*  <div className="Recipe-ingredient-frame">
                {props["recipe"]["recipeMaterial"].map((e) => (
                <p className="Recipe-ingredient-text">
                    {e}
                </p>
                ))}
            </div> */}
        </div>
    )
}
export default RecipeIcon