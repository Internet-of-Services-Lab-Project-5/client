import { LinearProgress } from "@mui/material";
import styled from "styled-components/macro";

type Props = {
  progress?: number;
} & React.ComponentProps<typeof Container>;

export const ProgressBar: React.FC<Props> = ({ progress, ...props }) => {
  return (
    <Container {...props}>
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

const Container = styled.div``;
