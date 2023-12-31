import styled from "styled-components/macro";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

type Props = {
  children: React.ReactNode;
  isVisible: boolean;
} & React.ComponentProps<typeof Container>;

export const Modal: React.FC<Props> = ({ children, isVisible, ...props }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setIsMounted(true);
      setTimeout(() => setIsOpen(true), 0);
    } else {
      setIsOpen(false);
      setTimeout(() => setIsMounted(false), 600);
    }
  }, [isVisible]);

  return createPortal(
    isMounted ? (
      <Container isVisible={isOpen} {...props}>
        {children}
      </Container>
    ) : null,
    document.getElementById("root")!
  );
};

/* -------------------------------------------------------------------------- */
/*                                   STYLES                                   */
/* -------------------------------------------------------------------------- */

const Container = styled.div<{ isVisible: boolean }>`
  position: fixed;
  z-index: 200;
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
  opacity: 0;
  opacity: ${({ isVisible }) => isVisible && 1};
  transition: opacity 0.3s ease-in-out;
`;
