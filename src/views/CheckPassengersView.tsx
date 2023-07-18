import styled from "styled-components/macro";
import {
  Box,
  CSVDropZone,
  PassengerSearchForm,
  Table,
  View,
  Modal,
  SearchProgress,
  SearchResults,
} from "../components";
import { useMemo, useState } from "react";
import { Button } from "@mui/material";
import { Passenger } from "../types";
import { initSearch } from "../requests";

type Props = React.ComponentProps<typeof View>;

export const CheckPassengersView: React.FC<Props> = (props) => {
  const [hasClicked, setHasClicked] = useState(false);
  const [passengers, setPassengers] = useState<Passenger[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [statusKey, setStatusKey] = useState<string>();
  const [results, setResults] = useState<any[] | undefined>();

  async function search(
    firstName: string,
    lastName: string,
    birthdate: string
  ) {
    const passengerList =
      firstName && lastName && birthdate
        ? [
            { first_name: firstName, last_name: lastName, birthdate },
            ...passengers,
          ]
        : passengers;
    handleAdd(firstName, lastName, birthdate);
    setHasClicked(true);
    setShowModal(true);
    console.log("Search started", Date.now());
    const statusKey = await initSearch(passengerList);
    console.log("StatusKey: ", statusKey);
    setStatusKey(statusKey);
    setTimeout(() => setHasClicked(false), 3000);
  }

  const handleAdd = (
    first_name: string,
    last_name: string,
    birthdate: string
  ) => {
    setPassengers((prev) => [{ first_name, last_name, birthdate }, ...prev]);
  };

  const handleRemove = (index: number) => {
    setPassengers((prev) => prev.filter((_, i) => i !== index));
  };

  const handleCSV = (headers: string[], lines: string[][]) => {
    const firstNameIndex = headers.indexOf("first_name");
    const lastNameIndex = headers.indexOf("last_name");
    const birthDateIndex = headers.indexOf("birthdate");

    if (
      firstNameIndex === -1 ||
      lastNameIndex === -1 ||
      birthDateIndex === -1
    ) {
      alert("Invalid column headers.");
      return;
    }
    for (const line in lines) {
      const values = lines[line];
      const firstName = values[firstNameIndex];
      const lastName = values[lastNameIndex];
      const birthDate = values[birthDateIndex];
      if (firstName && lastName && birthDate)
        handleAdd(firstName, lastName, birthDate);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setTimeout(() => (setStatusKey(undefined), setResults(undefined)), 500);
  };

  const handleResults = (results: any[]) => {
    console.log("Search finished", Date.now());
    const comparedResult = passengers.map((passenger) => {
      const wasUnruly = results.some(
        (record) =>
          record['"first_name"'] === `"${passenger["first_name"]}"` &&
          record['"last_name"'] === `"${passenger["last_name"]}"` &&
          record['"birthdate"'] === `"${passenger["birthdate"]}"`
      );
      return {
        firstName: passenger["first_name"],
        lastName: passenger["last_name"],
        birthdate: passenger.birthdate,
        wasUnruly,
      };
    });
    setResults(comparedResult);
  };

  return (
    <View {...props}>
      <Section>
        <StyledBox>
          <Form>
            <PassengerSearchForm
              disabled={hasClicked}
              onSearchClick={search}
              onAddClick={handleAdd}
            />
          </Form>
        </StyledBox>
        <Explaination>
          Enter the data of the passenger you want to check and click on{" "}
          <strong>search</strong>
          <br />
          or click on the <strong>+</strong> button to add passengers to the
          list below first and check multiple passengers at once.
        </Explaination>
      </Section>
      <Section>
        <StyledBox>
          <CSVDropZone
            onReadContent={handleCSV}
            placeholder={
              <>
                Drag and drop a <strong>CSV</strong> file here to add multiple
                passengers at once.
              </>
            }
          >
            {!!passengers.length && (
              <Table
                columns={["First Name", "Last Name", "Birthdate", "Options"]}
                content={passengers.map((passenger, index) => [
                  passenger["first_name"],
                  passenger["last_name"],
                  passenger.birthdate,
                  <OptionsContainer>
                    <Remove onClick={() => handleRemove(index)}>
                      {"Remove"}
                    </Remove>
                  </OptionsContainer>,
                ])}
              />
            )}
          </CSVDropZone>
        </StyledBox>
        <Explaination>
          You can add multiple passengers at once by dragging and dropping a{" "}
          <strong>CSV</strong>.
          <br />
          Note, that the CSV needs to have columns named{" "}
          <strong>first_name</strong>, <strong>last_name</strong> and{" "}
          <strong>birthdate</strong>. The expected date format is{" "}
          <strong>DD/MM/YYYY</strong>.
        </Explaination>
      </Section>
      <Modal isVisible={showModal}>
        <ModalBox>
          {results === undefined ? (
            <SearchProgress
              statusKey={statusKey || ""}
              onResultsLoaded={handleResults}
              onError={() => console.error("Something went wrong.")}
            />
          ) : (
            <>
              <SearchResults results={results} />
              <Close onClick={handleModalClose} />
            </>
          )}
        </ModalBox>
      </Modal>
    </View>
  );
};

/* -------------------------------------------------------------------------- */
/*                                   STYLES                                   */
/* -------------------------------------------------------------------------- */

const Form = styled.div`
  flex: 1;
`;

const StyledBox = styled(Box)`
  flex-shrink: 0;
  width: 60vw;
`;

const OptionsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 100%;
  width: 100%;
  padding-right: 10px;
`;

const Remove = styled(Button)`
  display: flex;
  justify-content: flex-end;
  align-items: center;
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

const ModalBox = styled(Box)`
  position: relative;
  height: 60vh;
  height: 60svh;
  width: 70vw;
`;

const Close = styled.div`
  transform: rotate(45deg);
  position: absolute;
  top: -5px;
  right: -5px;
  height: 20px;
  width: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: #ddd;
  font-weight: bold;
  cursor: pointer;
  transform: rotate(45deg);
  transition: background-color 0.15s ease-in-out;

  :hover {
    background-color: red;
  }

  ::before {
    content: "+";
  }
`;
