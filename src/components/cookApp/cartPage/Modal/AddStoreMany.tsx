// import { Controller, useForm } from "react-hook-form";
import { Button, Grid } from "@material-ui/core";
import { Box, TextField, Switch } from "@mui/material";
// import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers-pro'
import React, { useEffect, useState } from "react";
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
// import ja from 'date-fns/locale/ja'
// import FormGroup from '@mui/material/FormGroup';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import FormControl from '@mui/material/FormControl';
// import FormLabel from '@mui/material/FormLabel';
// import CreateInventory from "../../../../api/postgre/cookapp/inventory/CreateInventory";
import AddCartMany from "../../../../api/postgre/cookapp/cart/AddCartMany";

//　食材データの型定義
type Inputform = {
  id: number;
  name: string;
};

type submitform = {
  inventory_id: number;
  amount?: string;
  memo?: string;
};

//　材料データの入力フォーム
const AddCartManyModal = (props) => {
  const divStyle = {
    borderBottom: "1px solid black",
  };

  const { inventories, checklist } = props;

  const [formValues, setFormValues] = useState({});

  const [checkedInventory, setCheckedInventory] = useState<Inputform[]>([]);

  useEffect(() => {
    (async function () {
      let inputlist: Inputform[] = [];
      for (var inventory of inventories) {
        if (checklist.includes(String(inventory["id"]))) {
          let input: Inputform = {
            id: inventory["id"],
            name: inventory["name"],
          };
          console.log(inventory);
          inputlist.push(input);
        }
        setCheckedInventory(inputlist);
      }
    })();
  }, []);

  //console.log(checkedInventory)

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let result: submitform[] = [];
    checkedInventory.map((row) => {
      let result_obj: submitform = { inventory_id: row.id };
      if (formValues[`amount${row.id}`]) {
        console.log("a");
        result_obj["amount"] = formValues[`amount${row.id}`];
      }
      if (formValues[`memo${row.id}`]) {
        result_obj["memo"] = formValues[`memo${row.id}`];
      }
      result.push(result_obj);
    });
    console.log(result);
    AddCartMany({
      user_id: Number(localStorage.getItem("user_id")),
      lists: result,
    });
  };

  return (
    <div className="under-line">
      <form onSubmit={handleSubmit}>
        {checkedInventory.map((row) => (
          <div style={divStyle} key={row.id}>
            <Grid container>
              <Grid item xs={4}>
                <TextField
                  label="在庫名"
                  name={`name${row.id}`}
                  value={row.name}
                  sx={{ display: "flex", width: "90%" }}
                  onChange={handleInputChange}
                  required
                  variant="outlined"
                  margin="dense"
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  label="量"
                  name={`amount${row.id}`}
                  sx={{ display: "flex", width: "80%" }}
                  onChange={handleInputChange}
                  variant="outlined"
                  margin="dense"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="めも"
                  name={`memo${row.id}`}
                  sx={{ display: "flex", width: "80%" }}
                  onChange={handleInputChange}
                  required
                  variant="outlined"
                  margin="dense"
                />
              </Grid>
            </Grid>
          </div>
        ))}
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </form>

      <button onClick={() => console.log(checkedInventory)}></button>
    </div>
  );
};

export default AddCartManyModal;
