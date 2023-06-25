import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import GenericTemplate from "../topsidebar/GenericTemplate";
import AppIcon from "./appIcon/AppIcon";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
} from "@material-ui/core";
import ToolsTab from "../homeApp/ToolsTab";
import GetTools from "../../api/postgre/tools/GetTools";
import { IconContext } from "react-icons";
import GetGroup from "../../api/postgre/tools/GetGroup";
import SelectTools from "../../api/postgre/tools/SelectTool";
import AddIcon from "@mui/icons-material/Add";
import clsx from "clsx";

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
// スマホの時はBottomNavi
const useWindowSize = (): boolean => {
  const [size, setSize] = useState([window.innerWidth, window.innerHeight]);
  useEffect(() => {
    const updateSize = (): void => {
      setSize([window.innerWidth, window.innerHeight]);
    };
    window.addEventListener("resize", updateSize);
    updateSize();
  }, []);

  return size[0] <= 500;
};

const HomePage: React.FC = () => {
  // DBからユーザ別に追加したものを取得
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [tools, setTools] = useState<Tools[]>([]);
  const [groups, setGroups] = useState<Groups[]>([]);
  const [group_id, setGroup_id] = useState();
  const isPhone = useWindowSize();

  const modalStyle = {
    height: "fit-content",
    top: "25%",
    width: "100%",
    justifyContent: "center",
    display: "flex",
  };

  // モーダルウィンドウの表示・非表示
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  // toolとgroupの初期化
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

  // group_idがModalで指定されたとき
  const handleChange = (event: any) => {
    setGroup_id(event.target.value);
  };

  return (
    <GenericTemplate title="ホーム">
      <div style={{ margin: "20px 0", position: "relative" }}>
        {/************************************************************
								ここに検索を追加 
		******************************************************************/}
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
              <MenuItem key={index} value={group.id}>
                {group.group_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div>
        {/* ブックマーク追加ボタン */}
        <motion.div
          className={clsx(isPhone && "App-Phone", "App-frame")}
          whileHover={{ scale: [null, 1.13, 1.03] }}
          transition={{ duration: 0.23 }}
          onClick={openModal}
        >
          <div
            className="First-frame"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <IconContext.Provider value={{ size: "100%" }}>
              <AddIcon sx={{ fontSize: 200 }}></AddIcon>
            </IconContext.Provider>
          </div>
        </motion.div>
        <Modal open={modalIsOpen} onClose={closeModal} style={modalStyle}>
          <ToolsTab />
        </Modal>

        {/* ブックマーク */}
        {tools.map((tool, index) => (
          <motion.div
            className={clsx(isPhone && "App-Phone", "App-frame")}
            whileHover={{ scale: [null, 1.13, 1.03] }}
            transition={{ duration: 0.23 }}
          >
            <a
              href={tool.url}
              key={index}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="Icon-frame">
                <IconContext.Provider value={{ size: "100%" }}>
                  <img
                    margin-top="50px"
                    width="100%"
                    object-fit="cover"
                    src={tool.ogp}
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
            </a>
          </motion.div>
        ))}
        <AppIcon />
      </div>
    </GenericTemplate>
  );
};

export default HomePage;
