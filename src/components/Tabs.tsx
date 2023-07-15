import styled from "styled-components/macro";

type Props = {
  values: string[];
  selectedValue: number;
  onSelect: (value: number) => void;
} & React.ComponentProps<typeof Container>;

export const Tabs: React.FC<Props> = ({ values, selectedValue, onSelect, ...props }) => {
  return (
    <Container {...props}>
      {values.map((tab, index) => (
        <Tab key={index} aria-selected={selectedValue === index} onClick={() => onSelect(index)}>
          {tab}
        </Tab>
      ))}
    </Container>
  );
};

/* -------------------------------------------------------------------------- */
/*                                   STYLES                                   */
/* -------------------------------------------------------------------------- */

const Container = styled.nav`
  display: flex;
  gap: 5px;
`;

const Tab = styled.button`
  border: none;
  background: none;
  padding: 10px;
  color: unset;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.2s ease-in-out;
  border-radius: 5px;

  &[aria-selected="true"] {
    background-color: cornflowerblue;
    color: white;
  }

  :not([aria-selected="true"]):hover {
    background-color: #eee;
  }
`;
