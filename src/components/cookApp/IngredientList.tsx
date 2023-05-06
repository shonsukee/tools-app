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
import { ingredient } from "./types";
import Modal from "react-modal";
import CreateIngredientModal from "./CreateIngredientModal";

//Modal.setAppElement("#test");

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});



const IngredientListPage = () => {
  const classes = useStyles();
  const [modalIsOpen, setIsOpen] = React.useState(false);

  const [ingredients, setIngredients] = useState<ingredient[]>([]);

  useEffect(() => {
    (async function () {
      const data = await GetsIngredient();
      setIngredients(data);
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



const [checkedValues, setCheckedValues] = useState([null]);

const handleChange = async(event) => {
  const { value } = event.target;
  console.log('チェックされた値1:', event.target.checked);
  if (event.target.checked) {
    setCheckedValues([...checkedValues, value]);
  } else {
    setCheckedValues(checkedValues.filter((item) => item !== value));
  }
  console.log('チェックされた値:', checkedValues);
};

const handleFormSubmit = () => {
  console.log('チェックされた値:', checkedValues);
};

  return (
    <GenericTemplate title="商品ページ">
      <div id="test" className="test">
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>食材名</TableCell>
                <TableCell align="center">カテゴリ名</TableCell>
                <TableCell align="right">量(g)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ingredients.map((row) => (
                <TableRow key={row.id}>
                  <Checkbox 
                  value={row.id} 
                  onChange={handleChange}
                  />
                  <TableCell align="center">{row.name}</TableCell>
                  <TableCell align="center">{row.category}</TableCell>
                  <TableCell align="right">{row.amount}</TableCell>
                </TableRow>
              ))} 
            </TableBody>
          </Table>
        </TableContainer>
        <button onClick={handleFormSubmit}>Open Modal</button>
        <div className="create-ingredient-modal">

          <button onClick={() => setIsOpen(true)}>Open Modal</button>
          <Modal isOpen={ modalIsOpen } style={ customStyles }>
            <CreateIngredientModal/>
            <button onClick={() => setIsOpen(false)}>Open Modal</button>
          </Modal>
          
        </div>
      </div>
    </GenericTemplate>
  );
};

export default IngredientListPage;