import styled from "styled-components/macro";
import { Box, View, Table, PassengerAddForm, CSVDropZone } from "../components";
import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import {
  addPassenger,
  addPassengers,
  createTable,
  dropTable,
  getPassengers,
  updateDataset,
} from "../requests";

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
  const [isUpdating, setIsUpdating] = useState(false);
  const [upToDate, setUpToDate] = useState(false);

  const handleAdd = async (data: PassengerDBEntry) => {
    await addPassenger(
      data.first_name,
      data.last_name,
      data.birthdate,
      data.incident,
      data.incident_date
    );
    const passengers = await getPassengers();
    setPassengers(passengers);
  };

  const handleCSV = async (headers: string[], lines: string[][]) => {
    const firstNameIndex = headers.indexOf("first_name");
    const lastNameIndex = headers.indexOf("last_name");
    const birthDateIndex = headers.indexOf("birthdate");
    const incidentIndex = headers.indexOf("incident");
    const incidentDateIndex = headers.indexOf("incident_date");

    if (
      firstNameIndex === -1 ||
      lastNameIndex === -1 ||
      birthDateIndex === -1 ||
      incidentIndex === -1 ||
      incidentDateIndex === -1
    ) {
      alert("Invalid column headers.");
      return;
    }

    const passengers = lines
      .map((line) => ({
        firstname: line[firstNameIndex],
        lastname: line[lastNameIndex],
        birthdate: line[birthDateIndex],
        incident: line[incidentIndex],
        incidentDate: line[incidentDateIndex],
      }))
      .filter(
        (p) =>
          p.firstname &&
          p.lastname &&
          p.birthdate &&
          p.incident &&
          p.incidentDate
      );
    await dropTable();
    await createTable();
    await addPassengers(passengers);
    const fetchedPassengers = await getPassengers();
    setPassengers(fetchedPassengers);
  };

  const handleDatasetUpdate = async () => {
    setIsUpdating(true);
    await updateDataset();
    setUpToDate(true);
    setIsUpdating(false);
  };

  useEffect(() => {
    (async () => {
      const passengers = await getPassengers();
      setPassengers(passengers);
    })();
  }, []);

  useEffect(() => {
    //fetch uptodat
    setUpToDate(false);
  }, [passengers]);

  return (
    <View {...props}>
      <Section>
        <StyledBox>
          <PassengerAddForm onAddClick={handleAdd} />
        </StyledBox>
        <Explaination>
          Add passengers to your local database. Note, that this does not
          automatically update the iExec dataset.
        </Explaination>
      </Section>
      <Section>
        <StyledTableBox>
          <StyledCSVDropZone
            placeholder="No passengers yet"
            onReadContent={handleCSV}
          >
            {!!passengers.length ? (
              <>
                {upToDate ? (
                  <PositiveText>Everything is up to date!</PositiveText>
                ) : (
                  <StyledButton
                    color="info"
                    variant="outlined"
                    disabled={isUpdating}
                    onClick={handleDatasetUpdate}
                  >
                    {isUpdating ? "...updating" : "Update on iExec"}
                  </StyledButton>
                )}

                <StyledTable
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
              </>
            ) : (
              <></>
            )}
          </StyledCSVDropZone>
        </StyledTableBox>
        <Explaination>
          The list of your <strong>unruly passengers</strong> will be displayed
          here. If the dataset provided to iExec is different to what is
          displayed here, you can <strong>update</strong> it by clicking the
          button.
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

const StyledButton = styled(Button)`
  align-self: flex-end;
`;

const StyledTable = styled(Table)`
  margin-top: 10px;
  td,
  th {
    white-space: nowrap;
  }
`;

const StyledCSVDropZone = styled(CSVDropZone)`
  display: flex;
  flex-direction: column;
`;
