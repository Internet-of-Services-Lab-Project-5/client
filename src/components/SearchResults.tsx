import styled from "styled-components/macro";
import { Table } from "../components";
import { ResultEntry } from "../types";

type Props = {
  results: ResultEntry[];
};

export const SearchResults: React.FC<Props> = ({ results }) => {
  return (
    <Container>
      <Title>Results</Title>
      <StyledTable
        showHeader
        columns={["First name", "Last name", "Birthdate", "Result"]}
        content={results
          .sort((a, b) => {
            if (a.wasUnruly && !b.wasUnruly) return -1;
            if (!a.wasUnruly && b.wasUnruly) return 1;
            return 0;
          })
          .map((result) => {
            const { firstName, lastName, birthdate, wasUnruly } = result;
            if (wasUnruly)
              return [
                <b>{firstName}</b>,
                <b>{lastName}</b>,
                <b>{birthdate}</b>,
                <b>{"UNRULY"}</b>,
              ];
            return [firstName, lastName, birthdate, "Clear"];
          })}
      />
    </Container>
  );
};

/* -------------------------------------------------------------------------- */
/*                                   STYLES                                   */
/* -------------------------------------------------------------------------- */

const Container = styled.section`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  overflow-x: hidden;
  align-items: flex-start;

  @media (max-width: 800px) {
    padding: 24px;
  }
`;

const Title = styled.h2`
  text-align: left;
  width: 100%;
  margin-top: 0;
`;

const StyledTable = styled(Table)`
  width: 100%;
  flex: 1;
  max-height: initial;
  b {
    color: red;
  }
  td {
    height: 30px;
  }
`;
