import styled, { css } from "styled-components/macro";
import { useState } from "react";
import { CheckPassengersView, AirlinesView, YourPassengersView } from "./views";
import { Tabs } from "./components";

const VIEWS = ["Check Passengers", "Your Unruly Passengers", "Airlines"];

function App() {
  const [selectedView, setSelectedView] = useState(0);

  return (
    <Container>
      <TopBar>
        <Header>{"Unruly Passenger Check Portal"}</Header>
        <Tabs values={VIEWS} selectedValue={selectedView} onSelect={setSelectedView} />
      </TopBar>
      <Views showView={selectedView}>
        <CheckPassengersView />
        <YourPassengersView />
        <AirlinesView />
      </Views>
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
