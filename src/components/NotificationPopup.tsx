import styled from "styled-components/macro";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

type Props = {
  children: React.ReactNode;
  isVisible: boolean;
  onCloseClick: () => void;
} & React.ComponentProps<typeof Container>;

export const NotificationPopup: React.FC<Props> = ({
  children,
  isVisible,
  onCloseClick,
  ...props
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setIsMounted(true);
      setTimeout(() => setIsOpen(true), 0);
    } else {
      setIsOpen(false);
      setTimeout(() => setIsMounted(false), 800);
    }
  }, [isVisible]);

  return createPortal(
    isMounted ? (
      <Container isVisible={isOpen} {...props}>
        {children}
        <Close onClick={onCloseClick} />
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
  z-index: 100;
  transform: translate(0, 0);
  bottom: 20px;
  right: 20px;
  min-width: 40vw;
  min-height: 50px;
  padding: 10px 20px;
  border-radius: 10px;
  background-color: #444;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transform: ${({ isVisible }) => !isVisible && `translateY(100vh)`};
  transition: transform 0.5s ease-in-out;
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
  background-color: #777;
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
