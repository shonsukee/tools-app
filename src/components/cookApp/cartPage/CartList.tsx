import React, { useEffect, useState } from "react";
import GenericTemplate from "../../topsidebar/GenericTemplate";
import { makeStyles } from "@material-ui/core/styles";
import Checkbox from '@material-ui/core/Checkbox';
import Modal from "react-modal";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { Button, Grid } from "@material-ui/core";
import { Link } from 'react-router-dom';
import { ingredient } from "../ingredientPage/types";
import GetCartList from "../../../api/postgre/cookapp/cart/GetCartList";
import CartIcon from "./icon/CartIcon";
import "./CartList.css"
import AddCartManyModal from "./Modal/AddStoreMany";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';



//Modal.setAppElement("#test");

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

// type cart = {
  
// }





const CartListPage = () => {
  const classes = useStyles();

  const [cart_list, setCart_list] = useState<ingredient[]>([]);

  const [AddStoreModalIsOpen, setAddStoreModalIsOpen] = React.useState(false);

  useEffect(() => {
    (async function () {
      const data = await GetCartList({
          "user_id": Number(localStorage.getItem("user_id"))
        });
      setCart_list(data["inventory"]);
    })();
  }, []);
  
    
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

  const [checkedValues, setCheckedValues] = useState<number[]>([]);

  
  const handleChange = async(event) => {
    const { value } = event.target;

    if (event.target.checked) {
      setCheckedValues([...checkedValues, value]);
    } else {
      setCheckedValues(checkedValues.filter((item) => item !== value));
    }
  };




    return (
      <GenericTemplate title="買い物リストページ">
      <div className="navigate-area">
        
        <div className="navigate-before">
          <Link to={'/inventory'}>
            <Button>
              <NavigateBeforeIcon/>在庫管理画面へ
            </Button>
          </Link>
        </div>
        
        <div className="navigate-next">
          <Link to={'/cookapp'}>
            <Button>
              <NavigateNextIcon/>食材管理画面へ
            </Button>
          </Link>
        </div>

      </div>
　    <Button onClick={() => setAddStoreModalIsOpen(true)}><ShoppingCartIcon/></Button>

      <Modal isOpen={ AddStoreModalIsOpen } style={ customStyles }>
            <AddCartManyModal inventories={ cart_list } checklist={checkedValues}/>
      </Modal> 

      <div id="test" className="cart-icon-list">
        <Grid container spacing={2}>
              {cart_list.map((row) => (
                 <Grid item>
                  <Checkbox value={row.id} onChange={handleChange}/>
                  <CartIcon name={row.name} category={row.category} />
                 </Grid>
              ))} 
        </Grid>
      </div>
    </GenericTemplate>
    );
};

export default CartListPage;