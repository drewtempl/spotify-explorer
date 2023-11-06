import { SelectChangeEvent } from "@mui/material";

type CountDropdownProps = {
  trackCount: string;
  countHandler: (event: SelectChangeEvent) => void;
  values: number[];
};

export default CountDropdownProps;
