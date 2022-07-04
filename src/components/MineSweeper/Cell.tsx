import * as React from "react";
import { Box, Button } from "@mui/material";
import AdbIcon from "@mui/icons-material/Adb";
import TourIcon from "@mui/icons-material/Tour";
import GameContext from "./GameContext";

interface CellProps {
  value: string | number;
  xCoord: number;
  yCoord: number;
  lostGame: () => void;
  flagged: boolean;
  revealed: boolean;
  updateFlagsBoard: (value1: number, value2: number, value3: boolean) => void;
  iconClass: string;
  checkAdjacentCells: (value1: number, value2: number) => void;
}

export const Cell: React.FC<CellProps> = ({
  value,
  xCoord,
  yCoord,
  lostGame,
  flagged,
  revealed,
  updateFlagsBoard,
  iconClass,
  checkAdjacentCells,
}) => {
  const { cellStates, setCellStates } = React.useContext(GameContext);
  const [bombClicked, setBombClicked] = React.useState(false);

  console.log(typeof xCoord, typeof yCoord);

  const checkValue = () => {
    if (value === 0) {
      checkAdjacentCells(xCoord, yCoord);
    } else if (value === -1) {
      lostGame();
      setBombClicked(true);
    }
  };
  const clickedCell = (click: string) => {
    if (click === "click") {
      updateCellStates(xCoord, yCoord);
      checkValue();
    } else if (click === "contextmenu") {
      updateFlagsBoard(xCoord, yCoord, !flagged);
    }
  };
  const updateCellStates = (x: number, y: number) => {
    const updatedCellStates = [...cellStates];
    updatedCellStates[x][y] = true;

    setCellStates(updatedCellStates);
  };

  const showValue = () => {
    return revealed === true ? (
      <Box component="span" sx={{ color: iconClass }}>
        {value === -1 ? <AdbIcon /> : value}
      </Box>
    ) : (
      <Box>&nbsp;</Box>
    );
  };
  return (
    <Button
      variant="outlined"
      id={`${xCoord}-${yCoord}`}
      onClick={(event) => {
        event.preventDefault();
        clickedCell(event.type);
      }}
      onContextMenu={(event) => {
        event.preventDefault();
        clickedCell(event.type);
      }}
      disabled={bombClicked ? true : false}
    >
      {flagged === true ? <TourIcon /> : showValue()}
    </Button>
  );
};
