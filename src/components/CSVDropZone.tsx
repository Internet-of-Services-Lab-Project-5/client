import styled from "styled-components/macro";
import { useEffect, useState } from "react";
import { parse } from "papaparse";

type Props = {
  children: React.ReactNode;
  placeholder?: React.ReactNode;
  onReadContent: (headers: string[], content: string[][]) => void;
} & Omit<React.ComponentProps<typeof Container>, "onDragOver" | "onDrop">;

export const CSVDropZone: React.FC<Props> = ({
  children,
  onReadContent,
  placeholder,
  ...props
}) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type !== "text/csv") {
        alert("Invalid file format.");
        return;
      }
      const reader = new FileReader();
      reader.onload = (readevent) => {
        const text = readevent.target?.result;
        if (typeof text !== "string") return;
        const res = parse<string[]>(text);
        if (res.errors.length > 0) {
          alert("Invalid CSV file.");
          return;
        }
        onReadContent(res.data[0], res.data.slice(1));
      };
      reader.readAsText(file);
    }
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  useEffect(() => {
    const blockDefault = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
    };

    window.addEventListener("dragover", blockDefault);
    window.addEventListener("drop", blockDefault);
    return () => {
      window.removeEventListener("dragover", blockDefault);
      window.removeEventListener("drop", blockDefault);
    };
  }, []);

  return (
    <Container
      isDragging={isDragging}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onDragLeave={handleDragLeave}
      {...props}
    >
      {!!children ? (
        children
      ) : (
        <Placeholder>
          <div>{placeholder}</div>
        </Placeholder>
      )}
    </Container>
  );
};

/* -------------------------------------------------------------------------- */
/*                                   STYLES                                   */
/* -------------------------------------------------------------------------- */

const Container = styled.div<{ isDragging: boolean }>`
  height: 100%;
  background-color: ${({ isDragging }) => isDragging && "ghostwhite"};
  border-radius: 5px;
  transition: background-color 0.2s ease-in-out;

  ${({ isDragging }) => isDragging && "cursor: copy"}
`;

const Placeholder = styled.div`
  font-size: 12px;
  color: lightslategray;
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
  user-select: none;
`;
