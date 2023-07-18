import styled from "styled-components/macro";
import { ProgressBar } from "../components";
import { useEffect, useState } from "react";
import { checkStatus, fetchResults, observe } from "../requests";

type Props = {
  statusKey: string;
  onResultsLoaded: (results: any[]) => void;
  onError: () => void;
  msBetweenPolls?: number;
};

export const SearchProgress: React.FC<Props> = ({
  statusKey,
  onResultsLoaded,
  onError,
  msBetweenPolls = 5000,
}) => {
  const [info, setInfo] = useState("Initiating search process");
  const [progress, setProgress] = useState<number>();

  useEffect(() => {
    if (!statusKey) return;

    setInfo("Started search process");
    setProgress(10);

    async function getResults() {
      const results = await fetchResults(statusKey);
      setProgress(100);
      setInfo("Done!");
      setTimeout(() => onResultsLoaded(results), 2000);
    }

    async function watchStatus() {
      if (progress !== undefined && progress >= 95) return;
      const response = await checkStatus(statusKey);
      const { tasksCount, tasksDone } = response;

      if (tasksCount === undefined || tasksDone === undefined) {
        onError();
        return;
      }

      if (tasksCount === 0) {
        setInfo("Waiting for status update...");
      } else {
        setInfo(`Checked ${tasksDone} of ${tasksCount} airlines`);
        setProgress(10 + (80 * tasksDone) / tasksCount);
      }

      if (tasksDone === tasksCount && tasksCount > 0) {
        setProgress(95);
        setInfo("Checked all airlines. Fetching results...");
      } else {
        setTimeout(watchStatus, msBetweenPolls);
      }
    }

    try {
      observe(statusKey, getResults);
      setTimeout(watchStatus, msBetweenPolls);
    } catch (error) {
      onError();
    }
  }, [statusKey]);

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
  height: 100%;
  width: 100%;
  overflow-x: hidden;
  align-items: center;
`;

const Info = styled.h2`
  text-align: center;
`;

const ProgressBarContainer = styled.div`
  color: cornflowerblue;
  width: 60%;
`;
