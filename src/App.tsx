import styled, { css } from "styled-components/macro";
import { useContext, useEffect, useState } from "react";
import { CheckPassengersView, AirlinesView, YourPassengersView } from "./views";
import { Tabs, NotificationPopup, LoginForm } from "./components";
import { Button } from "@mui/material";
import { SessionContext } from "./contexts/SessionContext";
import { AirlineContext } from "./contexts/AirlineContext";

const VIEWS = ["Check Passengers", "Your Unruly Passengers", "Airlines"];

function App() {
  const [selectedView, setSelectedView] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const { isLoggedIn } = useContext(SessionContext);
  const { eventType } = useContext(AirlineContext);
  const [popupMessage, setPopupMessage] = useState("");

  useEffect(() => {
    if (eventType === "proposed") setPopupMessage("New airline proposed!");
    if (eventType === "added") setPopupMessage("New airline accepted!");
    if (eventType === "rejected") setPopupMessage("Candidate was rejected.");
    if (eventType) setShowPopup(true);
  }, [eventType]);

  useEffect(() => {
    if (showPopup) {
      setTimeout(() => setShowPopup(false), 10000);
    }
  }, [showPopup]);

  return (
    <Container>
      {isLoggedIn ? (
        <>
          <TopBar>
            <Header>
              {"Unruly Passenger Check Portal"}
              <Button variant="outlined" onClick={() => location.reload()}>
                Logout
              </Button>
            </Header>
            <Tabs
              values={VIEWS}
              selectedValue={selectedView}
              onSelect={setSelectedView}
            />
          </TopBar>
          <Views showView={selectedView}>
            <CheckPassengersView />
            <YourPassengersView />
            <AirlinesView />
          </Views>
          <NotificationPopup
            isVisible={showPopup}
            onCloseClick={() => setShowPopup(false)}
          >
            {popupMessage}
            <Button
              color="inherit"
              variant="outlined"
              onClick={() => (setSelectedView(2), setShowPopup(false))}
            >
              Open Airlines
            </Button>
          </NotificationPopup>
        </>
      ) : (
        <LoginForm />
      )}
    </Container>
  );
}

/* -------------------------------------------------------------------------- */
/*                                   STYLES                                   */
/* -------------------------------------------------------------------------- */

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  height: 100svh;
  overflow-x: hidden;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`;

const TopBar = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  padding: 0 20px;
  flex-shrink: 0;
`;

const Header = styled.header`
  font-size: 40px;
  font-weight: bold;
  text-align: left;
  margin: 20px 0;
  display: flex;
  justify-content: space-between;

  > button {
    height: min-content;
  }
`;

const Views = styled.main<{ showView: number }>`
  flex: 1;
  display: flex;
  justify-content: flex-start;

  ${({ showView }) => css`
    transform: translateX(-${showView * 100}vw);
  `}

  transition: transform 0.3s ease-in-out;
`;

export default App;
