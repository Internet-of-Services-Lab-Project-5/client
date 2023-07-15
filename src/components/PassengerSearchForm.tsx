import styled from "styled-components/macro";
import { Button, TextField } from "@mui/material";
import { DatePicker } from ".";
import { useState, useMemo } from "react";

type Props = {
  disabled?: boolean;
  onSearchClick: (firstName: string, lastName: string, birthdate: string) => void;
  onAddClick: (firstName: string, lastName: string, birthdate: string) => void;
} & React.ComponentProps<typeof Container>;

export const PassengerSearchForm: React.FC<Props> = ({
  disabled,
  onSearchClick,
  onAddClick,
  ...props
}) => {
  const [firstName, setFirstName] = useState("Nara");
  const [lastName, setLastName] = useState("Blenkinship");
  const [birthDate, setBirthDate] = useState("29/12/1953");
  const [hasClicked, setHasClicked] = useState(false);

  const formattedDate = useMemo(() => birthDate.split("/").reverse().join("-"), [birthDate]);

  const handleClick = () => {
    setHasClicked(true);
    onSearchClick(firstName, lastName, birthDate);
  };

  const handleAdd = () => {
    if (firstName && lastName && birthDate) {
      onAddClick(firstName, lastName, birthDate);
      setFirstName("");
      setLastName("");
      setBirthDate("");
    }
  };

  const handleBirthDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = e.target.value;
    if (newDate) {
      const [year, month, day] = newDate.split("-");
      setBirthDate(`${day}/${month}/${year}`);
    } else {
      setBirthDate("");
    }
  };

  const checkError = (val: string) => {
    return hasClicked && !val;
  };

  return (
    <Container {...props}>
      <StyledTextField
        disabled={disabled}
        error={checkError(firstName)}
        required
        label="First name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <StyledTextField
        disabled={disabled}
        error={checkError(lastName)}
        required
        label="Last name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <StyledDatePicker
        disabled={disabled}
        error={checkError(birthDate)}
        required
        label="Date of birth"
        date={formattedDate}
        onDateChange={handleBirthDate}
      />
      <AddButton disabled={disabled} variant="outlined" onClick={handleAdd}>
        +
      </AddButton>
      <Button disabled={disabled} variant="contained" onClick={handleClick}>
        Search
      </Button>
    </Container>
  );
};

/* -------------------------------------------------------------------------- */
/*                                   STYLES                                   */
/* -------------------------------------------------------------------------- */

const Container = styled.div`
  display: flex;
  gap: 15px;
  width: 100%;
`;

const AddButton = styled(Button)`
  font-size: 30px !important;
  padding: 0 !important;
`;

const StyledTextField = styled(TextField)`
  flex: 1;
`;

const StyledDatePicker = styled(DatePicker)`
  flex: 1;
`;
