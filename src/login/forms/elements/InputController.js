import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
export const InputController = ({
  name,
  labelContent,
  placeholder,
  OnChange,
  InputType,
  error

}) => {
  const { control } = useFormContext();
  //function to change pwd visibility
  const [showPassword, setShowPassword] = useState(InputType);
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  //text field function
  function MyTextField() {
    const [value, setValue] = useState("");
    const handleBlur = (event) => {
      setValue(event.target.value);
      OnChange(value);
    };

    return (
      <>
        <TextField
        error={!error}
           value={value}
          onChange={(event) => setValue(event.target.value)}
          onBlur={handleBlur}
          id={name}
          label={labelContent}
          variant="outlined"
          placeholder={placeholder}
          fullWidth
          margin="normal"
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: InputType ? (
              <></>
            ) : (
              <InputAdornment position="end">
                <IconButton onClick={handleTogglePasswordVisibility}>
                  {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        {!error&& 
        <span style={{color:"red"}}>invalid {labelContent} </span>
      }
        </>
    );
  }
  //
  return (
    <Controller control={control} name={name} render={() => MyTextField()} />
  );
};
