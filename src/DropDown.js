import React, { useState } from "react";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';


const DropDown = ({ label, id, options, onClick, required, className }) => {
  const [state, setState] = useState('');

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    onClick(selectedValue);
    setState(selectedValue);
  };


  return (
    <FormControl >
      <InputLabel id="demo-simple-select-label" >{label}</InputLabel>
      <Select
        className={className}
        required={required}
        value={state}
        onChange={handleChange}
        id={id}
        labelId="demo-simple-select-label"
      >
        {
          options.map(({ value, label }, index) => {
            return <MenuItem key={index} value={value}>{label}</MenuItem>
          })
        }
      </Select>
    </FormControl >
  );
};


export default DropDown;