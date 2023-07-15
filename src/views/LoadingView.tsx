import styled from "styled-components/macro";
import { ProgressBar } from "../components";
import { useEffect, useState } from "react";

type Props = {
  dealId: string;
  onResultsLoaded?: (results: any[]) => void;
};

export const LoadingView: React.FC<Props> = ({ dealId, onResultsLoaded }) => {
  const [info, setInfo] = useState("Initiating search process");
  const [progress, setProgress] = useState<number>();

  function listenToStatus() {
    // api.checkStatus(dealId, (tasksCount, tasksDone) => {
    //   setInfo(`Checked ${tasksDone} of ${tasksCount} airlines`);
    //   if (tasksDone === tasksCount) {
    //     setProgress(95);
    //     setInfo("Checked all airlines. Fetching results...");
    //   }
    // });
  }

  useEffect(() => {
    if (dealId) {
      setInfo("Started search process");
      setProgress(10);
      listenToStatus();
    }
  }, [dealId]);

  useEffect(() => {
    const getResults = async () => {
      // const results = await api.fetchResults(dealId);
      // setProgress(100);
      // setInfo("Done!");
      // onResultsLoaded && setTimeout(() => onResultsLoaded(results), 1000);
    };
    if (progress === 95) getResults();
  }, [progress]);

  return (
    <Container>
      <Info>{info}</Info>
      <ProgressBarContainer>
        <ProgressBar progress={progress} />
      </ProgressBarContainer>
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
  align-items: center;

  @media (max-width: 800px) {
    padding: 24px;
  }
`;

const Info = styled.h2`
  text-align: center;
`;

const ProgressBarContainer = styled.div`
  width: 60vw;
`;
