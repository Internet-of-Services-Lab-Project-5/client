import { FormControl, InputLabel, OutlinedInput } from "@mui/material";
import { useState } from "react";
import styled from "styled-components/macro";

type Props = {
  label?: string;
  date: string;
  onDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
} & React.ComponentProps<typeof FormControl>;

export const DatePicker: React.FC<Props> = ({ label, date, onDateChange, ...props }) => {
  return (
    <FormControl {...props}>
      <InputLabel shrink>{label}</InputLabel>
      <Input value={date} onChange={onDateChange} notched label={label} type="date" />
    </FormControl>
  );
};

/* -------------------------------------------------------------------------- */
/*                                   STYLES                                   */
/* -------------------------------------------------------------------------- */

const Input = styled(OutlinedInput)``;
