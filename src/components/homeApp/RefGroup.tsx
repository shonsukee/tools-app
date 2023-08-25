import { useForm } from "react-hook-form";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import GetTools from "../../api/postgre/tools/GetTools";
import GetGroup from "../../api/postgre/tools/GetGroup";
import CreateRef from "../../api/postgre/tools/CreateRef";

interface Tools {
  id: number;
  title: string;
  detail: string;
  url: string;
  ogp: string;
}

interface Groups {
  id: number;
  group_name: string;
}

const RefGroup = () => {
  const { handleSubmit } = useForm<Tools>({
    mode: "onChange",
  });

  const [tools, setTools] = useState<Tools[]>([]);
  const [groups, setGroups] = useState<Groups[]>([]);
  const [group_id, setGroup_id] = useState();
  const [check_tools, setCheck_tools] = useState<string[]>([]);

  // ツールとグループの初期化
  useEffect(() => {
    (async function () {
      const tool = await GetTools({
        user_id: Number(localStorage.getItem("user_id")),
      });
      setTools(tool);

      const group = await GetGroup({
        user_id: Number(localStorage.getItem("user_id")),
      });
      setGroups(group);
    })();
  }, []);

  // group_idが指定されたとき
  const handleChange = (event: any) => {
    setGroup_id(event.target.value);
  };

  const onSubmit = async () => {
    await check_tools.map((check_tool) =>
      CreateRef({
        group_id: group_id,
        tool_id: parseInt(check_tool, 10),
      })
    );
    setTimeout(() => {}, 2000);
    window.location.href = "/home";
  };

  //
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
      <FormControl component={MenuItem}>
        <InputLabel
          id="demo-simple-select-helper-label"
          style={{ width: "fit-content" }}
        >
          グループ名
        </InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={group_id || ""}
          label="グループ名"
          autoWidth
          style={{ width: "150px" }}
          onChange={handleChange}
        >
          <MenuItem value="0">
            <em>None</em>
          </MenuItem>
          {groups.map((group, index) => (
            <MenuItem key={index} value={group.id || ""}>
              {group.group_name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
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

export default RefGroup;
