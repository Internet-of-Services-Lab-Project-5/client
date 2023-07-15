import styled from "styled-components/macro";
import { useState, useMemo } from "react";
import { Button, TextField } from "@mui/material";

export const CandidateInterface: React.FC = () => {
  const [candidate, setCandidate] = useState<string>("");
  const [vote, setVote] = useState<boolean>();
  const [airline, setAirline] = useState<string>("");
  const [ethAddress, setEthAddress] = useState<string>("");
  const [iExecAddress, setIExecAddress] = useState<string>("");

  const hasVoted = useMemo(() => vote !== undefined, [vote]);
  // const canPropose = useMemo(() => !candidate, [candidate]);
  const canPropose = false;

  const handlePropose = () => {
    if (airline && ethAddress && iExecAddress) {
      //TODO: propose to the smart contract
      setAirline("");
      setEthAddress("");
      setIExecAddress("");
    }
  };

  if (canPropose)
    return (
      <Container isVertical={true}>
        <StyledTextField
          required
          label="Airline"
          value={airline}
          onChange={(e) => setAirline(e.target.value)}
        />
        <StyledTextField
          required
          label="Ethereum Address"
          value={ethAddress}
          onChange={(e) => setEthAddress(e.target.value)}
        />
        <StyledTextField
          required
          label="iExec Address"
          value={iExecAddress}
          onChange={(e) => setIExecAddress(e.target.value)}
        />
        <StyledButton variant="contained" onClick={handlePropose}>
          Propose
        </StyledButton>
      </Container>
    );

  return (
    <Container>
      <Candidate>
        <Text>Current candidate:</Text>
        <Name>{candidate}</Name>
      </Candidate>
      <Vote>
        {hasVoted ? (
          <Text>
            You voted <strong>{vote ? "yes" : "no"}</strong>. The voting is still in progress.
          </Text>
        ) : (
          <>
            <Text>Do you want this candidate to join the other partners?</Text>
            <Buttons>
              <Button color="success" onClick={() => setVote(true)}>
                {"Yes"}
              </Button>
              <Button color="error" onClick={() => setVote(false)}>
                {"No"}
              </Button>
            </Buttons>
          </>
        )}
      </Vote>
    </Container>
  );
};

/* -------------------------------------------------------------------------- */
/*                                   STYLES                                   */
/* -------------------------------------------------------------------------- */

const Container = styled.div<{ isVertical?: boolean }>`
  display: flex;
  gap: 15px;
  flex-direction: ${({ isVertical }) => (isVertical ? "column" : "row")};
`;

const Candidate = styled.div`
  flex: 1;
`;

const Vote = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const Text = styled.div`
  font-size: 14px;
`;

const Name = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

const StyledButton = styled(Button)`
  flex-shrink: 0;
  height: fit-content;
  align-self: flex-end;
`;

const Buttons = styled.div`
  display: flex;
  gap: 10px;
  align-self: center;
`;

const StyledTextField = styled(TextField)``;
