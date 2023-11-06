import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";
import CountDropdownProps from "./CountDropdown.types";

export const CountDropdown: React.FC<CountDropdownProps> = ({
  trackCount,
  countHandler,
  values,
}) => {
  return (
    <FormControl sx={{ minWidth: "90px" }}>
      <InputLabel id="track-count-select-label"># of Tracks</InputLabel>
      <Select
        labelId="track-count-select-label"
        id="track-count-select"
        value={trackCount}
        label="# of Tracks"
        onChange={countHandler}
      >
        {values.map((value: number) => (
          <MenuItem value={value}>{value}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
