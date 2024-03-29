import GenericTemplate from "../../topsidebar/GenericTemplate";
import { Grid } from "@material-ui/core";
import InventoryIcon from "./icon/InventoryIcon";
import "./inventoryList.css"
import { inventory } from "./types";
import Modal from "react-modal";
import React, { useEffect, useState } from "react";
import CreateInventoryModal from "./Modal/CreateInventoryModal";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import GetStoreList from "../../../api/postgre/cookapp/store/GetStoreList";
import AddCartMany from "../../../api/postgre/cookapp/cart/AddCartMany";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { Link } from 'react-router-dom';
import AddCartManyModal from "./Modal/AddCartMany";


const InventoryListPage = () => {

  //const user_id = Number(localStorage.getItem("user_id"))
  
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [cartmodalIsOpen, setcartIsOpen] = React.useState(false);

  const customStyles = {
    content: {
      top: "20%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, 0%)",
      minWidth: "80%",
      height: "70%",
    },
  };
  const [Inventories, setInventories] = useState<inventory[]>([]);

  useEffect(() => {
    (async function () {
      const data = await  GetStoreList({
        "user_id": Number(localStorage.getItem("user_id"))
      });
      setInventories(data);
    })();
  }, []); 


  const [checkedValues, setCheckedValues] = useState<number[]>([]);


  const handleChange = async(event) => {
    const { value } = event.target;
    /* for (var inventory of Inventories){
      if(inventory["id"] == value){
        const name = inventory["name"]
      }
    } */
    if (event.target.checked) {
      setCheckedValues([...checkedValues, value]);
    } else {
      setCheckedValues(checkedValues.filter((item) => item !== value));
    }
  };



  //買い物リストに追加する
  

  return (
    <GenericTemplate title="在庫一覧ページ">
        <div className="navigate-area">
        
          <div className="navigate-before">
            <Link to={'/cookapp'}>
              <Button>
                <NavigateBeforeIcon/>食材管理画面へ
              </Button>
            </Link>
          </div>
          
          <div className="navigate-next">
            <Link to={'/cart'}>
              <Button>
                <NavigateNextIcon/>買い物リストを表示
              </Button>
            </Link>
          </div>

      </div>
      <div className="SearchForm">
          検索します
      </div>
      <div className="FunctionArea">
        <Button onClick={() => setIsOpen(true)}>食材を追加する</Button>
          <Modal isOpen={ modalIsOpen } style={ customStyles }>
            <CreateInventoryModal/>
            <Button onClick={() => setIsOpen(false)} type="submit" color="secondary" variant="contained" size="large">
              キャンセル
            </Button>
          </Modal>
        <Button onClick={() => setcartIsOpen(true)}><ShoppingCartIcon/></Button>
        <Modal isOpen={ cartmodalIsOpen } style={ customStyles }>
            <AddCartManyModal inventories={Inventories} checklist={checkedValues}/>
        </Modal>
      </div>
      <div id="test" className="inventory-icon-list">
        <Grid container spacing={2}>
            {Inventories.map((row) => (
            <Grid item>
              <Checkbox value={row.id} onChange={handleChange}/>
              <InventoryIcon name={row.name} category={row.category} />
            </Grid>
            ))}
        </Grid>
      </div>
    </GenericTemplate>
  );
};

export default InventoryListPage;