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
import CreateIngredient from "../../../../api/postgre/cookapp/ingredient/CreateIngredient";



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
const CreateIngredientModal = () => {

  const [value, setValue] = React.useState<Date | null>(null)

  const [edible, setedible] = React.useState(false);

  const handleedible = (event) => {
    setedible(event.target.checked);
    console.log(edible)
  };


  const {
    control,
    handleSubmit,
  } = useForm<Ingredient>({
    mode: "onChange",
  })

//　データの送信
  const onSubmit = (data:Ingredient) => {
    console.log(data)
    if(value != null){
      data["expiry_date"] = value
    }
    data["edible"] = edible
    data["amount"] = Number(data["amount"])
    CreateIngredient({
      user_id: Number(localStorage.getItem("user_id")),
      data: data
    })
  };


  return (
    <Box
    component="form"
    marginTop="50px"
    width="100%"
    display="flex"
    flexDirection="column"
    justifyContent="center"
    onSubmit={handleSubmit(onSubmit)}
  >
  <Grid container>
    <Grid item xs = {5}>
      <Controller
        name="name"
        control={control}
        rules={{
          required: "入力必須ですよ！",
          maxLength: {
            value: 30,
            message: "30文字以下で入力してくださいね！",
          },
        }}
        render={({
          field: { onChange, onBlur, value, name, ref },
          fieldState: { invalid, isTouched, isDirty, error },
        }) => (
          <TextField
            label="食材名"
            sx={{ display: "flex", width: "90%" }}
            required
            variant="outlined"
            margin="dense"
            onChange={onChange}
            error={Boolean(error)}
            helperText={error?.message}
          />
        )}
      />
    </Grid>
    <Grid item xs = {4}>
      <Controller
        name="category"
        control={control}
        rules={{
          required: "入力必須ですよ！",
          maxLength: {
            value: 30,
            message: "30文字以下で入力してくださいね！",
          },
        }}
        render={({
          field: { onChange, onBlur, value, name, ref },
          fieldState: { invalid, isTouched, isDirty, error },
        }) => (
          <TextField
            label="カテゴリ名"
            sx={{ display: "flex", width: "80%" }}
            required
            variant="outlined"
            margin="dense"
            onChange={onChange}
            error={Boolean(error)}
            helperText={error?.message}
          />
        )}
      />
    </Grid>    
  </Grid>
  <Grid container>
    <Grid item xs={4}>    
      <Controller
        name="amount"
        control={control}
        rules={{
          required: "入力必須ですよ！",
          maxLength: {
            value: 30,
            message: "30文字以下で入力してくださいね！",
          },
        }}
        render={({
          field: { onChange, onBlur, value, name, ref },
          fieldState: { invalid, isTouched, isDirty, error },
        }) => (
          <TextField
            label="量"
            sx={{ display: "flex", width: "90%" }}
            required
            variant="outlined"
            margin="dense"
            onChange={onChange}
            error={Boolean(error)}
            helperText={error?.message}
          />
        )}
      />
    </Grid>
    <Grid item xs={2}>
      <Controller
        name="unit"
        control={control}
        rules={{
          required: "入力必須ですよ！",
          maxLength: {
            value: 30,
            message: "30文字以下で入力してくださいね！",
          },
        }}
        render={({
          field: { onChange, onBlur, value, name, ref },
          fieldState: { invalid, isTouched, isDirty, error },
        }) => (
          <TextField
            label="単位"
            sx={{ display: "flex", width: "80%" }}
            required
            variant="outlined"
            margin="dense"
            onChange={onChange}
            error={Boolean(error)}
            helperText={error?.message}
          />
        )}
      />
    </Grid>
  </Grid>
  <div className="edible-form" style={{padding:"10px"}}>
   <FormControl component="fieldset">
      <FormGroup aria-label="position" row>
        <FormControlLabel
          value="start"
          control={
          <Switch
            color="primary" 
            checked={edible}
            onChange={(e) => handleedible(e)}

          />
        }
          label="食材ですか？"
          labelPlacement="start"
        />
      </FormGroup>
    </FormControl>
  </div>

  <Grid container>
    <Grid item xs={4}>
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ja}>
      <DatePicker label="期限日" value={value} onChange={(newValue) => setValue(newValue)} />
    </LocalizationProvider>
    </Grid>
  </Grid>
  <Grid container>
    <Grid item xs={12}>    
      <Controller
        name="memo"
        control={control}
        rules={{
          maxLength: {
            value: 30,
            message: "30文字以下で入力してくださいね！",
          },
        }}
        render={({
          field: { onChange, onBlur, value, name, ref },
          fieldState: { invalid, isTouched, isDirty, error },
        }) => (
          <TextField
            sx={{width:"100%"}}
            label="めも"
            variant="outlined"
            margin="dense"
            onChange={onChange}
            error={Boolean(error)}
            helperText={error?.message}
          />
        )}
      />
    </Grid>
  </Grid>




    <Button type="submit" color="primary" variant="contained" size="large">
      送信する
    </Button>
  </Box>    
  );
};

export default CreateIngredientModal;

