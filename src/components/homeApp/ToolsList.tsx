import { Controller, useForm } from "react-hook-form";
import { Button, TextField } from "@material-ui/core";
import { Box } from "@mui/material";
import CreateTools from "../../api/postgre/tools/CreateTools";
import { validation } from "./validation";
import { zodResolver } from "@hookform/resolvers/zod";

type Tools = {
  title: string;
  detail: string;
  url: string;
};

const ToolsList = () => {
  const { handleSubmit, control } = useForm<Tools>({
    mode: "onChange",
    resolver: zodResolver(validation),
  });

  const onSubmit = (data: any) => {
    CreateTools({
      user_id: Number(localStorage.getItem("user_id")),
      title: data.title,
      detail: data.detail,
      url: data.url,
    });
    window.location.href = "/home";
  };

  return (
    <Box
      component="form"
      padding="30px"
      bgcolor="#fff"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Controller
        name="title"
        control={control}
        render={({
          field: { onChange, onBlur, value, name, ref },
          fieldState: { invalid, isTouched, isDirty, error },
        }) => (
          <TextField
            label="タイトル"
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
        name="detail"
        control={control}
        render={({
          field: { onChange, onBlur, value, name, ref },
          fieldState: { invalid, isTouched, isDirty, error },
        }) => (
          <TextField
            label="詳細"
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
        name="url"
        control={control}
        render={({
          field: { onChange, onBlur, value, name, ref },
          fieldState: { invalid, isTouched, isDirty, error },
        }) => (
          <TextField
            label="URL"
            required
            variant="outlined"
            margin="dense"
            onChange={onChange}
            error={Boolean(error)}
            helperText={error?.message}
          />
        )}
      />

      <Button type="submit" color="primary" variant="contained" size="large">
        送信する
      </Button>
    </Box>
  );
};

export default ToolsList;
