import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import React, { useState } from "react";

export const SelectController = ({ OnChange, labelname, values, }) => {

  //
  const [selectedItem, setSelectedItem] = useState("");
  //get every select change and update the selected item const 
  const handleChange = (event) => {
    const selectedItem = event.target.value;
    //send back the selected item to the parent component
    OnChange(selectedItem);
    //set the selected item to put it in the select value
    setSelectedItem(selectedItem);
  };
  return (
    <Box>
      <FormControl fullWidth>
        <InputLabel>{labelname}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedItem }
          label={labelname}
          onChange={handleChange}
          
        >
          {values.map((value) => {
            return <MenuItem value={value}>{value}</MenuItem>;
          })}
        </Select>
      </FormControl>
    </Box>
  );
};

export default function BasicSelect() {}
