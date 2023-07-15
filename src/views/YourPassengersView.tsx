import styled from "styled-components/macro";
import { Box, View, Table, PassengerAddForm } from "../components";
import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { getPassengers } from "../requests";

export type PassengerDBEntry = {
  id?: number;
  first_name: string;
  last_name: string;
  birthdate: string;
  incident_date: string;
  incident: string;
};

type Props = React.ComponentProps<typeof View>;

export const YourPassengersView: React.FC<Props> = (props) => {
  const [passengers, setPassengers] = useState<PassengerDBEntry[]>([]);

  const upToDate = false; //fetch somehow

  const handleAdd = (data: PassengerDBEntry) => {
    console.log(data); //TODO: send to server
  };

  useEffect(() => {
    (async () => {
      const passengers = await getPassengers();
      setPassengers(passengers);
    })();
  }, []);

  console.log(passengers);

  return (
    <View {...props}>
      <Section>
        <StyledBox>
          <PassengerAddForm onAddClick={handleAdd} />
        </StyledBox>
        <Explaination>
          Here, you can <strong>vote</strong> for a potential partner airline or{" "}
          <strong>propose</strong> one if there is currently no candidate.
        </Explaination>
      </Section>
      <Section>
        <StyledTableBox>
          {upToDate ? (
            <PositiveText>Everything is up to date!</PositiveText>
          ) : (
            <StyledButton color="info" variant="outlined">
              Update on iExec
            </StyledButton>
          )}
          <Table
            columns={[
              "Id",
              "First name",
              "Last name",
              "Date of birth",
              "Incident date",
              "Incident",
            ]}
            content={passengers.map((p) => [
              p.id,
              p["first_name"],
              p["last_name"],
              p.birthdate,
              p["incident_date"],
              p.incident,
            ])}
            showHeader
          />
        </StyledTableBox>
        <Explaination>
          The list of your <strong>unruly passengers</strong> will be displayed here. If the dataset
          provided to iExec is different to what is displayed here, you can <strong>update</strong>{" "}
          it by clicking the button.
        </Explaination>
      </Section>
    </View>
  );
};

/* -------------------------------------------------------------------------- */
/*                                   STYLES                                   */
/* -------------------------------------------------------------------------- */

const StyledBox = styled(Box)`
  flex-shrink: 0;
  width: 60vw;
`;

const StyledTableBox = styled(StyledBox)`
  display: flex;
  flex-direction: column;
  max-height: 40vh;
`;

const Explaination = styled.p`
  font-size: 12px;
  padding: 10px;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  user-select: none;
  margin: 0;
`;

const Section = styled.section`
  display: flex;

  :hover {
    ${Explaination} {
      opacity: 1;
    }
  }
`;

const PositiveText = styled.div`
  color: green;
  font-weight: bold;
  font-size: 12px;
  align-self: flex-end;
  height: 37px;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledButton = styled(Button)`
  align-self: flex-end;
`;
