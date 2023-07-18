import styled from "styled-components/macro";
import { Button, TextField } from "@mui/material";
import { Box, Modal } from ".";
import { useState, useContext } from "react";
import { SessionContext } from "../contexts/SessionContext";

type Props = {};

export const LoginForm: React.FC<Props> = () => {
  const [email, setEmail] = useState("employee@company.com");
  const [password, setPassword] = useState("00000000");
  const [hasClicked, setHasClicked] = useState(false);
  const [hasError, setHasError] = useState(false);

  const { attemptLogin } = useContext(SessionContext);

  const handleClick = () => {
    setHasClicked(true);

    (async () => {
      const isSuccessful = await attemptLogin(email, password);
      setHasError(!isSuccessful);
    })();
  };

  const checkError = (val: string) => {
    return (hasClicked && !val) || hasError;
  };

  return (
    <Modal isVisible={true}>
      <StyledBox>
        <h2>Unruly Passenger Check Portal</h2>
        <StyledTextField
          error={checkError(email)}
          required
          label="User"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
        />
        <StyledTextField
          error={checkError(password)}
          required
          label="Password"
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="contained" onClick={handleClick}>
          Login
        </Button>
      </StyledBox>
    </Modal>
  );
};

/* -------------------------------------------------------------------------- */
/*                                   STYLES                                   */
/* -------------------------------------------------------------------------- */

const StyledTextField = styled(TextField)`
  flex: 1;
`;

const StyledBox = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 40vw;
  max-width: 450px;

  h2 {
    margin-top: 0;
    align-self: center;
  }
`;
