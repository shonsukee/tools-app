import CreateIngredient from "../../../api/postgre/ingredient/CreateIngredient";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button , TextField} from '@material-ui/core'
import { Box } from "@mui/material";

type Ingredient = {
    name: string;
    category: string;
    amount: number;
  }
  

const CreateIngredientModal = () => {

  const {
    control,
    handleSubmit,
  } = useForm<Ingredient>({
    mode: "onChange",
  });

  const onSubmit = async (data: Ingredient) => {
      console.log(data)
      console.log(typeof data.amount);
      //Int型に変換
      
      data.amount = Number(data.amount)
      //要素を追加
      console.log(typeof data.amount);
      CreateIngredient(data);
      
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
          required
          variant="outlined"
          margin="dense"
          onChange={onChange}
          error={Boolean(error)}
          helperText={error?.message}
        />
      )}
    />
    
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
          required
          variant="outlined"
          margin="dense"
          onChange={onChange}
          error={Boolean(error)}
          helperText={error?.message}
        />
      )}
    />
    
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
          label="食材量"
          required
          variant="outlined"
          margin="dense"
          onChange={onChange}
          error={Boolean(error)}
          helperText={error?.message}
        />
      )}
    />
    {/*/email, gender, subject, message は省略*/}

    <Button type="submit" color="primary" variant="contained" size="large">
      送信する
    </Button>
  </Box>    
  );
};

export default CreateIngredientModal;

/* 
<label htmlFor="category">category</label>
        <input id="category" type="text" {...register("category")} />
        <p>{errors.category?.message as React.ReactNode}</p> */