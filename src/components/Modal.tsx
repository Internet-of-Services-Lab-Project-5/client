import styled from "styled-components/macro";
import { Box } from ".";
// import { createPortal } from "react-dom";

type Props = { children: React.ReactNode } & React.ComponentProps<typeof Container>;

export const Modal: React.FC<Props> = ({ children, ...props }) => {
  //   {
  //     createPortal(
  //       <Container {...props}>
  //         <Box>{children}</Box>
  //       </Container>,
  //       document.body
  //     );
  //   }
  return <></>;
};

/* -------------------------------------------------------------------------- */
/*                                   STYLES                                   */
/* -------------------------------------------------------------------------- */

const Container = styled.div`
  position: fixed;
  z-index: 100;
  transform: translate(0, 0);
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  height: 100svh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;
