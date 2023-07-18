import styled from "styled-components/macro";

type Props = {
  columns: string[];
  content: React.ReactNode[][];
  showHeader?: boolean;
} & React.ComponentProps<typeof Container>;

export const Table: React.FC<Props> = ({
  columns,
  content,
  showHeader,
  ...props
}) => {
  return (
    <Container showHeader={showHeader} {...props}>
      <table>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {content.map((row, rowIndex) => (
            <Row key={rowIndex} useSecondaryColor={rowIndex % 2 === 0}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </Row>
          ))}
        </tbody>
      </table>
    </Container>
  );
};

/* -------------------------------------------------------------------------- */
/*                                   STYLES                                   */
/* -------------------------------------------------------------------------- */

const Container = styled.div<{ showHeader?: boolean }>`
  display: flex;
  flex-direction: column;
  max-height: 40vh;
  overflow-y: auto;

  border-radius: 5px;

  table {
    border-collapse: collapse;
  }

  thead {
    position: sticky;
    top: 0;
    background-color: white;
    z-index: 1;
    height: ${({ showHeader }) => (showHeader ? "30px" : "0")};
  }

  th,
  td {
    text-align: left;
    padding: 5px 10px;
    font-size: 14px;
  }

  th {
    display: ${({ showHeader }) => !showHeader && "none"};
  }
`;

const Row = styled.tr<{ useSecondaryColor?: boolean }>`
  background-color: ${({ useSecondaryColor }) =>
    useSecondaryColor && "#e6e6fa63"};
`;
