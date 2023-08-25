import { Controller, useForm } from "react-hook-form";
import { Button, TextField } from "@material-ui/core";
import { Box } from "@mui/material";
import CreateGroup from "../../api/postgre/tools/CreateGroup";
import { zodResolver } from "@hookform/resolvers/zod";
import { validationGroup } from "./validation";

type Tools = {
  group_name: string;
};

const ToolsGroup = () => {
  const { control, handleSubmit } = useForm<Tools>({
    mode: "onChange",
    resolver: zodResolver(validationGroup),
  });

  const onSubmit = async (data: Tools) => {
    await CreateGroup({
      group_name: data.group_name,
      user_id: Number(localStorage.getItem("user_id")),
    });
    setTimeout(() => {}, 2000);
    window.location.href = "/home";
  };

  return (
    <Box
      component="form"
      bgcolor="#fff"
      borderRadius="5px"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Controller
        name="group_name"
        control={control}
        render={({
          field: { onChange, onBlur, value, name, ref },
          fieldState: { invalid, isTouched, isDirty, error },
        }) => (
          <TextField
            label="グループ名"
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

export default ToolsGroup;
