import * as React from "react";
import { useStyles } from "../useStyles";
import { Box } from "@mui/material";

interface ProgressElement {
  name?: string;
  value: number;
  color?: string;
  showPercentage?: boolean;
  textColor?: string;
  fontSize?: number;
}

interface IMultiProgressProps {
  backgroundColor?: string;
  border?: string;
  elements: ProgressElement[];
  height?: number | string;
  round?: boolean;
  roundLastElement?: boolean;
  transitionTime?: number;
}

const createElementArray = (elements: ProgressElement[]) => {
  let currentOffset = 0;
  const newElements = [] as any[];

  elements.forEach((element, i) => {
    const cellClass: any = {
      HTML: "#3A2E39",
      JavaScript: "#f1e05a",
      TypeScript: "3178c6",
      SQL: "purple",
      JAVA: "turqoise",
      ".NET": "maroon",
    };
    newElements.push(
      <Box
        sx={{
          backgroundColor: cellClass[element.name],
          width: `${elements[i].value}%`,
          height: "100%",
          zIndex: 8,
          top: 0,
          left: `${currentOffset}%`,
          position: "absolute",
          color: "#fff",
          textAlign: "center",
          fontSize: "1em",
          borderRadius: "0 40px 40px 0",
        }}
        key={i}
      ></Box>
    );
    currentOffset += elements[i].value;
  });
  return newElements;
};

const MultiProgress: React.FC<IMultiProgressProps> = ({ elements }) => {
  console.log(elements);
  const classes = useStyles();
  return (
    <div className={classes.multiProgressContainer}>
      <div className={classes.multiProcessBackground} />
      {createElementArray(elements).map((element, i) => (
        <div key={i}>{element}</div>
      ))}
    </div>
  );
};

export default MultiProgress;
