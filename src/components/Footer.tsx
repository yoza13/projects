import * as React from "react";
import { Typography, Box } from "@mui/material";
import { useStyles } from "../useStyles";

export const Footer: React.FC = () => {
  const classes = useStyles();
  return (
    <Box className={classes.footer}>
      <Typography variant="body2">Made by Yash Oza</Typography>
    </Box>
  );
};
