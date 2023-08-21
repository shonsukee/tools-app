import { useForm } from "react-hook-form";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
} from "@material-ui/core";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import GetTools from "../../api/postgre/tools/GetTools";
import DeleteTool from "../../api/postgre/tools/DeleteTool";

interface Tools {
  id: number;
  title: string;
  detail: string;
  url: string;
  ogp: string;
}

const DelTool = () => {
  const { handleSubmit } = useForm<Tools>({
    mode: "onChange",
  });

  const [tools, setTools] = useState<Tools[]>([]);
  const [check_tools, setCheck_tools] = useState<string[]>([]);

  // ツールとグループの初期化
  useEffect(() => {
    (async function () {
      const tool = await GetTools({
        user_id: Number(localStorage.getItem("user_id")),
      });
      setTools(tool);
    })();
  }, []);

  const onSubmit = () => {
    check_tools.map(async (check_tool) => {
      await DeleteTool({
        id: Number(check_tool),
      });
    });
    window.location.href = "/home";
  };

  const [checkedState, setCheckedState] = useState(
    tools.reduce((initial, tool) => ({ ...initial, [tool.id]: false }), {})
  );

  const handleCheckboxChange = (event) => {
    setCheckedState({
      ...checkedState,
      [event.target.value]: event.target.checked,
    });
  };

  const onClick = () => {
    const checkedIds = Object.keys(checkedState).filter(
      (id) => checkedState[id]
    );
    setCheck_tools(checkedIds);
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
      <FormControl component="fieldset">
        <FormGroup aria-label="position">
          {tools.map((tool, index) => (
            <FormControlLabel
              key={index}
              value={tool.id || ""}
              control={<Checkbox />}
              label={tool.title}
              labelPlacement="end"
              onChange={handleCheckboxChange}
            />
          ))}
        </FormGroup>
      </FormControl>
      <Button
        type="submit"
        color="primary"
        variant="contained"
        size="large"
        onClick={onClick}
      >
        送信する
      </Button>
    </Box>
  );
};

export default DelTool;
