import { Controller, useForm } from "react-hook-form";
import { Button, Grid } from '@material-ui/core'
import { Box, TextField, Switch} from "@mui/material";
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers-pro'
import React, { useState } from "react";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import ja from 'date-fns/locale/ja'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import RecipeIcon from "../Icon/RecipeIcon";



//　食材データの型定義
type Ingredient = {
    name: string;
    category: string;
    is_ingredient: boolean,
    amount: number;
    unit: string;
    edible: boolean;
    memo: string;
    create_date: Date;
    expiry_date: Date;
  }
  

//　食材データの入力フォーム
const RecipeListModal = (props) => {

  const { recipe_list, ingredient } = props;

  


  return (
      <div>
          <Grid container spacing={4}>
            {recipe_list.map((recipe) => (    
            <Grid item>
              <RecipeIcon recipe={recipe["result"][0]} ingredient={ingredient} />
            </Grid>
            ))}
          </Grid>
      </div> 
  );
};

export default RecipeListModal;

