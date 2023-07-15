import { Button } from "@mui/material";
import styled from "styled-components/macro";

type Props = {
  results: any[];
};

export const ResultsView: React.FC<Props> = ({ results }) => {
  return (
    <Container>
      <Title>Results</Title>
      <Results>
        {results.length ? (
          results.map((result, index) => (
            <Line key={index}>{`${result["first_name"]} ${result["last_name"]} (${
              result["incident_date"]
            }): ${(result.incident as string).replace(/\"/g, "")}`}</Line>
          ))
        ) : (
          <Line>No incidents found.</Line>
        )}
      </Results>
      <Button variant="outlined" color="inherit" onClick={() => window.location.reload()}>
        Back
      </Button>
    </Container>
  );
};

/* -------------------------------------------------------------------------- */
/*                                   STYLES                                   */
/* -------------------------------------------------------------------------- */

const Container = styled.section`
  display: flex;
  flex-direction: column;
  padding: 20vh 24px 24px;
  gap: 10vw;
  box-sizing: border-box;
  height: 100vh;
  height: 100svh;
  width: 100vw;
  overflow-x: hidden;
  align-items: flex-start;

  @media (max-width: 800px) {
    padding: 24px;
  }
`;

const Title = styled.h1`
  text-align: left;
  width: 100%;
`;

const Line = styled.div``;

const Results = styled.div`
  flex: 1;
  margin-left: 24px;
  padding: 24px;
  background-color: white;
  color: black;
  border-radius: 8px;
  box-shadow: -5px 5px 10px 0 rgba(0, 0, 0, 0.3);
`;
