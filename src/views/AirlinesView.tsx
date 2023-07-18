import styled from "styled-components/macro";
import { Box, View, CandidateInterface, Table } from "../components";
import { useState, useEffect, useContext } from "react";
import { getAirlines } from "../requests";
import { AirlineContext } from "../contexts/AirlineContext";

type Props = React.ComponentProps<typeof View>;

export const AirlinesView: React.FC<Props> = (props) => {
  const [partners, setPartners] = useState<string[]>([]);
  const { airlines } = useContext(AirlineContext);

  useEffect(() => {
    (async () => {
      const fetchedAirlines = await getAirlines();
      setPartners(fetchedAirlines);
    })();
  }, []);

  useEffect(() => {
    if (airlines) {
      setPartners(airlines);
    }
  }, [airlines]);

  return (
    <View {...props}>
      <Section>
        <StyledBox>
          <CandidateInterface />
        </StyledBox>
        <Explaination>
          Here, you can <strong>vote</strong> for a potential partner airline or{" "}
          <strong>propose</strong> one if there is currently no candidate.
        </Explaination>
      </Section>
      <Section>
        <StyledBox>
          <Label>
            Airlines
            <Table columns={["Name"]} content={partners.map((p) => [p])} />
          </Label>
        </StyledBox>
        <Explaination>
          The list of <strong>participating airlines</strong> will be displayed
          here. Airlines listed here can search for unruly passengers, vote for
          a candidate airline, and propose one.
        </Explaination>
      </Section>
    </View>
  );
};

/* -------------------------------------------------------------------------- */
/*                                   STYLES                                   */
/* -------------------------------------------------------------------------- */

const StyledBox = styled(Box)`
  flex-shrink: 0;
  width: 60vw;
`;

const Explaination = styled.p`
  font-size: 12px;
  padding: 10px;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  user-select: none;
  margin: 0;
`;

const Section = styled.section`
  display: flex;

  :hover {
    ${Explaination} {
      opacity: 1;
    }
  }
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
