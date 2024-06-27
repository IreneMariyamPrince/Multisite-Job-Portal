/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectVariants({ filterArray, label, filterValue }) {
  const handleChange = event => {
    if (event.target.value !== 'All') {
      filterValue(event.target.value);
    } else {
      filterValue('');
    }
  };

  return (
    <div>
      <FormControl variant='standard' sx={{ m: 1, width: 250 }}>
        <InputLabel>{label}</InputLabel>
        <Select onChange={handleChange} defaultValue='All'>
          <MenuItem value='All'>All</MenuItem>
          {filterArray?.map(({ status, value }) => {
            return (
              <MenuItem key={value} value={value}>
                {status}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
}
