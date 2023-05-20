import "./AppIcon.css";
import { MdFoodBank } from "react-icons/md";
import { IconContext } from "react-icons";
import { Link } from "react-router-dom";

const AppIcon = () => {
  return (
    <div>
      <Link to={"/cookApp/home"}>
        <div className="App-frame">
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
        </div>
      </Link>
      <Link to={"/news"}>
        <div className="App-frame">
          <div className="Icon-frame">
            <IconContext.Provider value={{ size: "100%" }}>
              <MdFoodBank />
            </IconContext.Provider>
          </div>
          <div className="App-title-frame">
            <p className="App-title">ニュースアプリ</p>
          </div>
          <div className="App-text-frame">
            <p className="App-text">
              ・忙しい人向けのニュース
              <br />
              ・昨日のニュース
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};
export default AppIcon;
