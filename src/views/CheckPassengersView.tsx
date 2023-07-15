import styled from "styled-components/macro";
import { Box, CSVDropZone, PassengerSearchForm, Table, View } from "../components";
import { useState } from "react";
import { Button } from "@mui/material";
import { Modal } from "../components/Modal";

export type Passenger = {
  firstName: string;
  lastName: string;
  birthDate: string;
};

type Props = React.ComponentProps<typeof View>;

export const CheckPassengersView: React.FC<Props> = (props) => {
  const [hasClicked, setHasClicked] = useState(false);

  const [passengers, setPassengers] = useState<Passenger[]>([]);

  async function initSearch(firstName: string, lastName: string, birthDate: string) {
    //   setHasClicked(true);
    //   onInitStart && onInitStart();
    //   const dealId = await api.initSearch(firstName, lastName, birthDate);
    //   console.log("DealId: ", dealId);
    //   onDealStart && onDealStart(dealId);
  }

  const handleAdd = (firstName: string, lastName: string, birthdate: string) => {
    setPassengers((prev) => [{ firstName, lastName, birthDate: birthdate }, ...prev]);
  };

  const handleRemove = (index: number) => {
    setPassengers((prev) => prev.filter((_, i) => i !== index));
  };

  const handleCSV = (headers: string[], lines: string[][]) => {
    const firstNameIndex = headers.indexOf("first_name");
    const lastNameIndex = headers.indexOf("last_name");
    const birthDateIndex = headers.indexOf("birthdate");

    if (firstNameIndex === -1 || lastNameIndex === -1 || birthDateIndex === -1) {
      alert("Invalid column headers.");
      return;
    }
    for (const line in lines) {
      const values = lines[line];
      const firstName = values[firstNameIndex];
      const lastName = values[lastNameIndex];
      const birthDate = values[birthDateIndex];
      if (firstName && lastName && birthDate) handleAdd(firstName, lastName, birthDate);
    }
  };

  return (
    <View {...props}>
      <Section>
        <StyledBox>
          <Form>
            <PassengerSearchForm
              disabled={hasClicked}
              onSearchClick={initSearch}
              onAddClick={handleAdd}
            />
          </Form>
        </StyledBox>
        <Explaination>
          Enter the data of the passenger you want to check and click on <strong>search</strong>
          <br />
          or click on the <strong>+</strong> button to add passengers to the list below first and
          check multiple passengers at once.
        </Explaination>
      </Section>
      <Section>
        <StyledBox>
          <CSVDropZone
            onReadContent={handleCSV}
            placeholder={
              <>
                Drag and drop a <strong>CSV</strong> file here to add multiple passengers at once.
              </>
            }
          >
            {!!passengers.length && (
              <Table
                columns={["First Name", "Last Name", "Birthdate", "Options"]}
                content={passengers.map((passenger, index) => [
                  passenger.firstName,
                  passenger.lastName,
                  passenger.birthDate,
                  <OptionsContainer>
                    <Remove onClick={() => handleRemove(index)}>{"Remove"}</Remove>
                  </OptionsContainer>,
                ])}
              />
            )}
          </CSVDropZone>
        </StyledBox>
        <Explaination>
          You can add multiple passengers at once by dragging and dropping a <strong>CSV</strong>.
          <br />
          Note, that the CSV needs to have columns named <strong>first_name</strong>,{" "}
          <strong>last_name</strong> and <strong>birthdate</strong>. The expected date format is{" "}
          <strong>DD/MM/YYYY</strong>.
        </Explaination>
      </Section>
      <Modal>haha</Modal>
      {/* <Modal open={true}>haha</Modal> */}
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
