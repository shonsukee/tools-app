import { Controller, useForm } from "react-hook-form";
import { Button, TextField } from "@material-ui/core";
import { Box } from "@mui/material";
import CreateTools from "../../api/postgre/tools/CreateTools";
import { validation } from "./validation";
import { zodResolver } from "@hookform/resolvers/zod";
import GetOgp from "../../api/postgre/tools/GetOgp";

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

  const onSubmit = async (data: any) => {
    let ogps;
    const extensions = [".com", ".net", ".org", ".jp"];
    let domainIndex = -1;
    let dot = 3;
    for (let ext of extensions) {
      let index = data.url.indexOf(ext);
      if (index !== -1) {
        domainIndex = index;
        if (ext !== ".jp") dot = 4;
        break;
      }
    }
    const ogpUrl = data.url.slice(0, domainIndex + dot);
    const getOgps = await GetOgp({ url: ogpUrl });
    // OGPがないとき
    if (getOgps.length === 0) {
      ogps =
        "https://3.bp.blogspot.com/-Uzi2iyvRCBM/W8BOOLU6wsI/AAAAAAABPW8/tud6RvPUYfwvyVSyFa8N5idm6890Npw-ACLcBGAs/s800/computer_bar5_load.png";
    }
    //OGPがあるとき
    else {
      ogps = getOgps;
    }
    CreateTools({
      user_id: Number(localStorage.getItem("user_id")),
      title: data.title,
      detail: data.detail,
      url: data.url,
      ogp: ogps,
    });
    window.location.href = "/home";
  };
  return (
    <Box
      component="form"
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
            multiline
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
