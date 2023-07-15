import { LinearProgress } from "@mui/material";
import styled from "styled-components/macro";

type Props = {
  progress?: number;
};

export const ProgressBar: React.FC<Props> = ({ progress }) => {
  return (
    <Container>
      <LinearProgress
        sx={{ height: 15, borderRadius: 10 }}
        color="inherit"
        variant={progress === undefined ? "indeterminate" : "determinate"}
        value={progress}
      />
    </Container>
  );
};

/* -------------------------------------------------------------------------- */
/*                                   STYLES                                   */
/* -------------------------------------------------------------------------- */

const Container = styled.div`
  color: white;
`;
