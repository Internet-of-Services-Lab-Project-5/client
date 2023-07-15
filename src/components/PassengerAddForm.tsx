import styled from "styled-components/macro";
import { Button, TextField } from "@mui/material";
import { DatePicker } from ".";
import { useState, useMemo } from "react";
import { PassengerDBEntry } from "../views";

type Props = {
  onAddClick: (data: PassengerDBEntry) => void;
  disabled?: boolean;
} & React.ComponentProps<typeof Container>;

export const PassengerAddForm: React.FC<Props> = ({ disabled, onAddClick, ...props }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthdate, setBirthDate] = useState("");
  const [incidentDate, setIncidentDate] = useState("");
  const [incident, setIncident] = useState("");
  const [hasClicked, setHasClicked] = useState(false);

  const formattedBirthDate = useMemo(() => birthdate.split("/").reverse().join("-"), [birthdate]);
  const formattedIncidentDate = useMemo(
    () => incidentDate.split("/").reverse().join("-"),
    [incidentDate]
  );

  const handleAdd = () => {
    setHasClicked(true);
    if (firstName && lastName && birthdate && incidentDate && incident) {
      onAddClick({
        first_name: firstName,
        last_name: lastName,
        birthdate,
        incident_date: incidentDate,
        incident,
      });
      setHasClicked(false);
      setFirstName("");
      setLastName("");
      setBirthDate("");
      setIncidentDate("");
      setIncident("");
    }
  };

  const handleDate = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const newDate = e.target.value;
    if (newDate) {
      const [year, month, day] = newDate.split("-");
      setter(`${day}/${month}/${year}`);
    } else {
      setter("");
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
        error={checkError(birthdate)}
        required
        label="Date of birth"
        date={formattedBirthDate}
        onDateChange={(e) => handleDate(e, setBirthDate)}
      />
      <StyledDatePicker
        disabled={disabled}
        error={checkError(incidentDate)}
        required
        label="Incident date"
        date={formattedIncidentDate}
        onDateChange={(e) => handleDate(e, setIncidentDate)}
      />
      <IncidentTextField
        disabled={disabled}
        error={checkError(incident)}
        required
        label="Incident"
        value={incident}
        onChange={(e) => setIncident(e.target.value)}
      />
      <AddButton disabled={disabled} variant="contained" onClick={handleAdd}>
        Add to local database
      </AddButton>
    </Container>
  );
};

/* -------------------------------------------------------------------------- */
/*                                   STYLES                                   */
/* -------------------------------------------------------------------------- */

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  width: 100%;
`;

const AddButton = styled(Button)`
  width: fit-content;
  grid-column: 2;
  justify-self: end;
`;

const StyledTextField = styled(TextField)`
  flex: 1;
`;

const StyledDatePicker = styled(DatePicker)`
  flex: 1;
`;

const IncidentTextField = styled(StyledTextField)`
  grid-column: 1 / span 2;
`;
