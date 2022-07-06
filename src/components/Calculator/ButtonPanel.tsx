import * as React from "react";
import { Box, Button, Stack } from "@mui/material";
import { useStyles } from "../../useStyles";

interface ButtonPanelProps {
  setValue: (value: string) => void;
  value: string;
  addedValues: string[];
  setAddedValues: (value: string[]) => void;
  operator: string;
  setOperator: (value: string) => void;
}

interface OperateProps {
  operation: string;
}

export const ButtonPanel: React.FC<ButtonPanelProps> = ({
  setValue,
  value,
  addedValues,
  setAddedValues,
  operator,
  setOperator,
}) => {
  const classes = useStyles();
  const operate = ({ operation }: OperateProps) => {
    const updatedValues = addedValues.concat([value]);
    let result;
    if (operator) {
      const allValues = value.split(operator);
      if (operator === "+") {
        result = parseInt(allValues[0]) + parseInt(allValues[1]);
      } else if (operator === "-") {
        result = parseInt(allValues[0]) - parseInt(allValues[1]);
      } else if (operator === "*") {
        result = parseInt(allValues[0]) * parseInt(allValues[1]);
      } else if (operator === "/") {
        result = parseInt(allValues[0]) / parseInt(allValues[1]);
      }
    }
    result = result.toString();
    setOperator(operation);
    if (operation === "=") {
      setValue(result);
    } else {
      setAddedValues(result !== undefined ? [result] : updatedValues);
      setValue(
        result !== undefined ? `${result}${operation}` : `${value}${operation}`
      );
    }
  };
  return (
    <Box className={classes.buttonPanel}>
      <Stack direction="row" className={classes.buttonStack}>
        <Button
          className={classes.buttons}
          onClick={() => {
            setAddedValues([]);
            setValue("0");
            setOperator("");
          }}
        >
          AC
        </Button>
        <Button
          className={classes.buttons}
          onClick={() => {
            setValue(
              ([-1, -0].includes(Math.sign(parseInt(value)))
                ? Math.abs(parseInt(value))
                : Math.abs(parseInt(value)) * -1
              ).toString()
            );
          }}
        >
          +/-
        </Button>
        <Button
          className={classes.buttons}
          onClick={() => {
            const percentValue = parseInt(value) / 100;
            setValue(percentValue.toString());
          }}
        >
          %
        </Button>
        <Button
          className={classes.buttons}
          onClick={() => operate({ operation: "/" })}
        >
          ÷
        </Button>
      </Stack>
      <Stack direction="row" className={classes.buttonStack}>
        <Button
          className={classes.buttons}
          onClick={() => setValue(`${value}7`)}
        >
          7
        </Button>
        <Button
          className={classes.buttons}
          onClick={() => setValue(`${value}8`)}
        >
          8
        </Button>
        <Button
          className={classes.buttons}
          onClick={() => setValue(`${value}9`)}
        >
          9
        </Button>
        <Button
          className={classes.buttons}
          onClick={() => operate({ operation: "*" })}
        >
          X
        </Button>
      </Stack>
      <Stack direction="row" className={classes.buttonStack}>
        <Button
          className={classes.buttons}
          onClick={() => setValue(`${value}4`)}
        >
          4
        </Button>
        <Button
          className={classes.buttons}
          onClick={() => setValue(`${value}5`)}
        >
          5
        </Button>
        <Button
          className={classes.buttons}
          onClick={() => setValue(`${value}6`)}
        >
          6
        </Button>
        <Button
          className={classes.buttons}
          onClick={() => operate({ operation: "-" })}
        >
          -
        </Button>
      </Stack>
      <Stack direction="row" className={classes.buttonStack}>
        <Button
          className={classes.buttons}
          onClick={() => setValue(`${value}1`)}
        >
          1
        </Button>
        <Button
          className={classes.buttons}
          onClick={() => setValue(`${value}2`)}
        >
          2
        </Button>
        <Button
          className={classes.buttons}
          onClick={() => setValue(`${value}3`)}
        >
          3
        </Button>
        <Button
          className={classes.buttons}
          onClick={() => operate({ operation: "+" })}
        >
          +
        </Button>
      </Stack>
      <Stack direction="row" className={classes.buttonStack}>
        <Button
          className={classes.buttons}
          onClick={() => setValue(`${value}0`)}
        >
          0
        </Button>
        <Button
          className={classes.buttons}
          onClick={() => setValue(`${value}.`)}
        >
          .
        </Button>
        <Button
          className={`${classes.buttons} wide`}
          onClick={() => operate({ operation: "=" })}
        >
          =
        </Button>
      </Stack>
    </Box>
  );
};
