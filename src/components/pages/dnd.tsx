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
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

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

// const useWindowSize = () => {
//   const [windowSize, setWindowSize] = useState(window.innerWidth);

//   useEffect(() => {
//     const handleResize = () => setWindowSize(window.innerWidth);
//     window.addEventListener("resize", handleResize);
//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, []);

//   return windowSize;
// };

// ドラッグアンドドロップ
/* 並び替え, 同ブロック */
const reorder = (list, startIndex, endIndex) => {
  const removed = list.splice(startIndex, 1); //ドラッグ開始要素の削除
  //   console.log(removed);
  list.splice(endIndex, 0, removed[0]); //ドロップした箇所に挿入
};

/* 並び替え, 異ブロック */
const move = (sourceList, destinationList, startIndex, endIndex) => {
  const removeDestination = destinationList.pop();
  const [removeSource] = sourceList.splice(startIndex, 1);
  destinationList.splice(endIndex, 0, removeSource);
  sourceList.unshift(removeDestination);
};

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

  // スマホか判定
  //   const windowSize = useWindowSize();

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

  // スマホの時，faviconの取得
  //   useEffect(() => {
  //     if (windowSize < 500) {
  //       tools.forEach((tool) => {
  //         const extensions = [".com", ".net", ".org", ".jp"];
  //         let domainIndex = -1;
  //         let dot = 3;

  //         for (let ext of extensions) {
  //           let index = tool.url.indexOf(ext);
  //           if (index !== -1) {
  //             domainIndex = index;
  //             if (ext !== ".jp") dot = 4;
  //             break;
  //           }
  //         }

  //         if (domainIndex === -1) {
  //           tool.ogp = "https://dummyimage.com/300x200/ccc/fff.png?text=No+Image";
  //         } else {
  //           tool.ogp = tool.url.slice(0, domainIndex + dot) + "/favicon.ico";
  //         }
  //       });
  //     }
  //   }, [tools, windowSize]);

  // ドラッグアンドドロップ
  // 配列の要素数を最大4つにする
  const chunkSize = 4;
  const results: Tools[][] = [];
  let j: number;
  for (let i = 0; i < tools.length; i += chunkSize) {
    if (i + chunkSize > tools.length) {
      j = tools.length - 1;
    } else {
      j = i + chunkSize;
    }
    results.push(tools.slice(i, j) as Tools[]);
  }

  // 要素をドラッグアンドドロップしたとき
  const onDragEnd = (result) => {
    const { source, destination } = result;
    const start = parseInt(
      source.droppableId.charAt(source.droppableId.length - 1),
      10
    );

    if (!destination) {
      return;
    }
    const end = parseInt(
      destination.droppableId.charAt(destination.droppableId.length - 1),
      10
    );

    if (source.droppableId === destination.droppableId) {
      reorder(results[start], source.index, destination.index);
    } else {
      move(results[start], results[end], source.index, destination.index);
    }
  };

  return (
    <GenericTemplate title="お気に入りページ">
      <div style={{ marginBottom: "20px", position: "relative" }}>
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
          className="App-frame"
          whileHover={{ scale: [null, 1.13, 1.03] }}
          transition={{ duration: 0.23 }}
          onClick={openModal}
        >
          <div className="First-frame">
            <IconContext.Provider value={{ size: "100%" }}>
              <AddIcon sx={{ fontSize: 200 }}></AddIcon>
            </IconContext.Provider>
          </div>
        </motion.div>
        <Modal open={modalIsOpen} onClose={closeModal} style={modalStyle}>
          <ToolsTab />
        </Modal>

        {/* ブックマーク */}
        <DragDropContext onDragEnd={onDragEnd}>
          {results.map((result, index) => (
            <Droppable
              droppableId={`droppable-${index}`}
              direction="horizontal"
            >
              {(provided, snapshot) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {result.map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id.toString()}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <motion.div
                          className="App-frame"
                          whileHover={{ scale: [null, 1.13, 1.03] }}
                          transition={{ duration: 0.23 }}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <a
                            href={item.url}
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
                                  src={item.ogp}
                                  alt="gazo"
                                />
                              </IconContext.Provider>
                            </div>
                            <div className="App-title-frame">
                              <p className="App-title">{item.title}</p>
                            </div>
                            <div className="App-text-frame">
                              <p className="App-text">{item.detail}</p>
                            </div>
                          </a>
                        </motion.div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </DragDropContext>
      </div>
      <AppIcon />
    </GenericTemplate>
  );
};

export default HomePage;
