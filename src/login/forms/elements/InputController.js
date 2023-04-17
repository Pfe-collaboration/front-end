import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import TextField from '@mui/material/TextField';

export const InputController = ({name, labelContent,placeholder,Dir}) => {
    const { control } = useFormContext();
    
    return (
      
    <Controller
    control={control}
    name={name}
    render={({ field }) => (
      <TextField
      // inputProps={{
        
      //   style: { textAlign: "right" }
      // }}
      dir={Dir}
      id={name}
            label={labelContent}
            variant="outlined"
            placeholder={placeholder}
            fullWidth
            margin="normal"
            {...field}
          />
        )}
      />
  )
}
