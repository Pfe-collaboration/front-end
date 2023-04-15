import { useState } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

export const useAddress = (Tunisie) => {
  const [selected, setSelected] = useState("");
  const values=Tunisie;
  const handleChange = (event) => {
    setSelected(event.target.value);
  };
  return {
    selected,
    values,
    handleChange,
    render: (
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={selected}
        label="Age"
        onChange={handleChange}
      >
        {
            values.map((value,index)=>{
              return(
                <MenuItem value={index}>{value}</MenuItem>
              )

            })
          }
      </Select>
    ),
  };
};
