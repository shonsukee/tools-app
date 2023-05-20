import { Controller, useForm } from "react-hook-form";
import { Button, TextField } from "@material-ui/core";
import { Box } from "@mui/material";
import { inventory } from "../types";
import CreateInventory from "../../../api/postgre/inventory/CreateInventory";

const CreateInventoryModal = () => {
  const { control, handleSubmit } = useForm<inventory>({
    mode: "onChange",
  });

  const onSubmit = async (data: inventory) => {
    //Int型に変換
    data.user_id = Number(localStorage.getItem("user_id"));
    data.amount = Number(data.amount);
    console.log(data);
    CreateInventory(data);
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
            label="名前"
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
            label="量"
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

export default CreateInventoryModal;

/* 
<label htmlFor="category">category</label>
        <input id="category" type="text" {...register("category")} />
        <p>{errors.category?.message as React.ReactNode}</p> */
