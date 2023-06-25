import "./AppIcon.css";
import { MdFoodBank } from "react-icons/md";
import { MdNewspaper } from "react-icons/md";
import { IconContext } from "react-icons";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import clsx from "clsx";
import { useEffect, useState } from "react";

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
const AppIcon = () => {
  const isPhone = useWindowSize();

  return (
    <>
      <motion.div
        className={clsx(isPhone && "App-Phone", "App-frame")}
        whileHover={{ scale: [null, 1.13, 1.03] }}
        transition={{ duration: 0.23 }}
      >
        <Link to={"/cookApp/home"}>
          <div className="Icon-frame">
            <IconContext.Provider value={{ size: "100%" }}>
              <MdFoodBank />
            </IconContext.Provider>
          </div>
          <div className="App-title-frame">
            <p className="App-title">冷蔵庫管理＆レシピアプリ</p>
          </div>
          <div className="App-text-frame">
            <p className="App-text">
              ・冷蔵庫内の食材の残量の管理
              <br />
              ・レシピの提案
            </p>
          </div>
        </Link>
      </motion.div>

      <motion.div
        className={clsx(isPhone && "App-Phone", "App-frame")}
        whileHover={{ scale: [null, 1.13, 1.03] }}
        transition={{ duration: 0.23 }}
      >
        <Link to={"/news"}>
          <div className="Icon-frame">
            <IconContext.Provider value={{ size: "100%" }}>
              <MdNewspaper />
            </IconContext.Provider>
          </div>
          <div className="App-title-frame">
            <p className="App-title">ニュースアプリ</p>
          </div>
          <div className="App-text-frame">
            <p className="App-text">
              ・ニュース
              <br />
              ・Chat GPTに要約
            </p>
          </div>
        </Link>
      </motion.div>
    </>
  );
};
export default AppIcon;
