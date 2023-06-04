import React, { useEffect, useState } from "react";
import GenericTemplate from "../topsidebar/GenericTemplate";
import AppIcon from "./appIcon/AppIcon";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import ToolsTab from "../homeApp/ToolsTab";
import GetTools from "../../api/postgre/tools/GetTools";
import { IconContext } from "react-icons";
import GetGroup from "../../api/postgre/tools/GetGroup";
import SelectTools from "../../api/postgre/tools/SelectTool";

interface Tools {
  title: string;
  detail: string;
  url: string;
  favicon: string;
}

interface Groups {
  id: any;
  group_name: string;
}

const HomePage: React.FC = () => {
  // DBからユーザ別に追加したものを取得
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [tools, setTools] = useState<Tools[]>([]);
  const [groups, setGroups] = useState<Groups[]>([]);
  const [group_id, setGroup_id] = useState();

  const modalStyle = {
    height: "fit-content",
    top: "25%",
    width: "100%",
    justifyContent: "center",
    display: "flex",
  };

  // モーダルウィンドウの表示
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

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

  // group_idがhandleChangeで変更されたとき，グループに所属するツール取得
  useEffect(() => {
    (async function () {
      const tool = await SelectTools({
        user_id: Number(localStorage.getItem("user_id")),
        group_id: group_id,
      });
      setTools(tool);
    })();
  }, [group_id]);

  // group_idが指定されたとき
  const handleChange = (event: any) => {
    setGroup_id(event.target.value);
  };

  // faviconの取得
  useEffect(() => {
    let jpUrl;
    // eslint-disable-next-line array-callback-return
    tools.map((tool) => {
      let index = tool.url.indexOf(".com");
      jpUrl = tool.url.slice(0, index + 4);
      console.log(jpUrl);
      if (index !== -1) {
        tool.favicon = "https://favicongrabber.com/api/grab/youtube.com";
      } else {
        tool.favicon = "https://google.com";
      }
    });
  }, [tools]);

  return (
    <GenericTemplate title="トップページ">
      <div style={{ marginBottom: "20px" }}>
        <Button
          variant="outlined"
          onClick={openModal}
          style={{ float: "right" }}
        >
          ツールを追加する
        </Button>
        <Modal open={modalIsOpen} onClose={closeModal} style={modalStyle}>
          <ToolsTab />
        </Modal>
        <FormControl component={MenuItem}>
          <InputLabel
            id="demo-simple-select-helper-label"
            style={{ width: "70px" }}
          >
            グループ名
          </InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={group_id}
            label="グループ名"
            autoWidth
            style={{ width: "150px" }}
            onChange={handleChange}
          >
            <MenuItem value="0">
              <em>None</em>
            </MenuItem>
            {groups.map((group) => (
              <MenuItem value={group.id}>{group.group_name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div></div>
      <div>
        {tools.map((tool) => (
          <Link to={tool.url}>
            <div className="App-frame">
              <div className="Icon-frame">
                <IconContext.Provider value={{ size: "100%" }}>
                  <img
                    margin-top="50px"
                    width="100%"
                    object-fit="cover"
                    src={tool.favicon}
                    // src={tool.favicon + "/favicon.ico"}
                    alt="gazo"
                  />
                </IconContext.Provider>
              </div>
              <div className="App-title-frame">
                <p className="App-title">{tool.title}</p>
              </div>
              <div className="App-text-frame">
                <p className="App-text">{tool.detail}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <AppIcon />
    </GenericTemplate>
  );
};

export default HomePage;
