import React, { useEffect, useState } from "react";
import GenericTemplatefood from "../../topsidebar/GenericTemplatefood";
import { makeStyles } from "@material-ui/core/styles";
import Checkbox from '@material-ui/core/Checkbox';
import { ingredient } from "./types";
import Modal from "react-modal";  
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { Button, Grid } from "@material-ui/core";
import { Link } from 'react-router-dom';
import '../../topsidebar/common/Navigate-area.css';  
import GetsIngredient from "../../../api/postgre/cookapp/ingredient/GetsIngredient";
import GetRecipe from "../../../api/recipe/GetRecipeID";
import GetRecipeRanking from "../../../api/recipe/GetRecipeRanking";
import IngredientIcon from "./Icon/IngredientIcon";
import CreateIngredientModal from "./Modal/CreateIngredientModal";
import RecipeListModal from "./Modal/RecipeListModal";
import "./IngredientList.css"

//Modal.setAppElement("#test");

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const IngredientListPage = () => {
  const classes = useStyles();
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [recipeModalIsOpen, setRecipeIsOpen] = React.useState(false);

  const [ingredients, setIngredients] = useState<any[]>([]);
  const [recipe,setRecipe] = useState<any[]>([])

  useEffect(() => {
    (async function () {
      const data = await GetsIngredient({
          "user_id": Number(localStorage.getItem("user_id"))
        });
      setIngredients(data);
      console.log(data)
    })();
  }, []);
  

//データ量に応じて画面がバグる修正
const customStyles = {
  content: {
    top: "20%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, 0%)",
    width: "80%",
    height: "70%",
  },
};



const [checkedValues, setCheckedValues] = useState<string[]>([]);

const handleChange = async(event) => {
  const { value } = event.target;
  if (event.target.checked) {
    setCheckedValues([...checkedValues, value]);
  } else {
    setCheckedValues(checkedValues.filter((item) => item !== value));
  }
};

const handleFormSubmit = async() => {
  console.log('チェックされた値:', checkedValues);
  let recipe_set:{ [key: string]: string[] } = await GetRecipe(checkedValues);
  let recipe_ingredients = Object.keys(recipe_set)
  console.log(recipe_ingredients)
  let result_recipe: any[] = []
  for(var recipe_ingredient of recipe_ingredients){
    let recipe_ids = recipe_set[recipe_ingredient]
    for(var recipe_id of recipe_ids){
      console.log(recipe_id)
      let new_recipe = await GetRecipeRanking({recipe_id:recipe_id})
      result_recipe.push(new_recipe)
      await sleep(1000);
    }
  }
  setRecipe(result_recipe)
  setRecipeIsOpen(true)
  console.log(recipe)
};

  return (
    <GenericTemplatefood title="食材ページ">
      <div className="ingredient-container">
      <div className="navigate-area">
        <div className="navigate-before">
          <Link to={'/inventory'}>
            <Button>
              <NavigateBeforeIcon/>在庫管理画面へ
            </Button>
          </Link>
        </div>
        <div className="navigate-next">
          <Link to={'/cart'}>
            <Button>
              <NavigateNextIcon/>買い物リストを表示
            </Button>
          </Link>
        </div>
      </div>
      <button onClick={handleFormSubmit}>料理する</button>
        <div className="create-ingredient-modal">
            <button onClick={() => setIsOpen(true)}>食材を追加する</button>
            <Modal isOpen={ modalIsOpen } style={ customStyles }>
              <CreateIngredientModal/>
              <Button onClick={() => setIsOpen(false)}>閉じる</Button>
            </Modal>   
            <Modal isOpen={ recipeModalIsOpen } style={ customStyles }>
              <RecipeListModal recipe_list={recipe} ingredient={ingredients}/>
              <Button onClick={() => setRecipeIsOpen(false)}>閉じる</Button>
            </Modal>    
        </div>
      <div id="test" className="ingredient-icon-list">
        <Grid container spacing={6}>
        {ingredients.map((row) => (
          <Grid item>
            <Checkbox value={row.name} onChange={handleChange}/>
            <IngredientIcon name={row.name} category={row.category} />
          </Grid>
            ))} 
          </Grid>
      </div>
      </div>
    </GenericTemplatefood>
  );
};

export default IngredientListPage;