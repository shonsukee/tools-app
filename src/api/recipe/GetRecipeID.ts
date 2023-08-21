import { recipe_category_id } from "./recipeCategoryID"

const GetRecipe = async ( lists:string[] ) =>{
  let res_recipe: { [key: string]: string[] } = {}
  for(var name of lists){
    let recipeID:string[] = []
    for(var recipe of recipe_category_id){
      if(recipe["categoryName"].includes(name)){
        let RecipeURL:string = recipe["categoryUrl"]
        let SplitRecipeURL:string[] = RecipeURL.split('/')
        let URLlength:number = SplitRecipeURL.length - 1
        recipeID.push(SplitRecipeURL[URLlength-1])
      }
    res_recipe[name] = recipeID
    }
  } 
    console.log(res_recipe)
    return res_recipe
  }

    
  export default GetRecipe;