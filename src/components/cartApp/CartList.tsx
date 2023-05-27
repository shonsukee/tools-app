import React, { useEffect, useState } from "react";
import GenericTemplate from "../topsidebar/GenericTemplate";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Checkbox from '@material-ui/core/Checkbox';
import GetsIngredient from "../../api/postgre/ingredient/GetsIngredient";
import Modal from "react-modal";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { Button } from "@material-ui/core";
import { Link } from 'react-router-dom';
import { ingredient } from "../cookApp/types";
import GetCartList from "../../api/postgre/cart/GetCartList";



//Modal.setAppElement("#test");

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});





const CartListPage = () => {
  const classes = useStyles();

  const [ingredients, setIngredients] = useState<ingredient[]>([]);

  useEffect(() => {
    (async function () {
      const data = await GetCartList({
          "user_id": Number(localStorage.getItem("user_id"))
        });
      console.log(data)
      setIngredients(data["inventory"]);
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

      <div id="test" className="list-area">
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell style={{ width: 50 }}>複数選択</TableCell>
                <TableCell align="center">食材名</TableCell>
                <TableCell align="center">カテゴリ名</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ingredients.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>
                    <Checkbox 
                      value={row.id} 
                    />
                  </TableCell>
                  <TableCell align="center">{row.name}</TableCell>
                  <TableCell align="center">{row.category}</TableCell>
                </TableRow>
              ))} 
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </GenericTemplate>
    );
};

export default CartListPage;