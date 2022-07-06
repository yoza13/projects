import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const useStyles: any = makeStyles<Theme>((theme) =>
  createStyles({
    drawerListItem: {
      color: "inherit",
    },
    appContainer: {
      width: "100%",
      maxWidth: "inherit",
      marginBottom: "10rem",
    },
    calculatorBox: {
      width: "fit-content",
      margin: "auto",
    },
    displayField: {
      color: "#fff",
      backgroundColor: theme.palette.grey[400],
      fontWeight: "bold",
      height: "3em",
      textAlign: "right",
      fontSize: "24px",
    },
    buttonPanel: {
      marginBottom: "2rem",
    },
    buttonStack: {
      borderTop: "1px solid",
      "&:last-child": {
        borderBottom: "1px solid",
      },
    },
    buttons: {
      fontSize: "24px",
      color: "#000",
      borderRight: "1px solid",
      borderRadius: 0,
      width: "25%",
      backgroundColor: theme.palette.grey[200],
      "&:last-child": {
        borderRight: "none",
        backgroundColor: theme.palette.warning.light,
      },
      "&.wide": {
        width: "50%",
      },
    },
    contentBox: {
      margin: "3rem 0 3rem 0",
      paddingTop: "2rem",
    },
    listStyleDisc: {
      listStyle: "disc",
    },
    listAsItem: {
      display: "list-item",
    },
    experienceCard: {
      maxWidth: 345,
      marginRight: "2rem",
      marginBottom: "3rem",
      marginLeft: "2rem",
    },
    boldWeight: {
      fontWeight: "bold",
    },
    dividerStyle: {
      borderColor: "inherit",
      margin: "auto",
      marginBottom: "1rem",
    },
    experienceAccordionStack: {
      marginBottom: "1rem",
      [theme.breakpoints.up("md")]: {
        display: "none !important",
      },
      "& .accordion": { padding: "0 1rem" },
    },
    experienceCardsStack: {
      flexWrap: "wrap",
      margin: "0 auto",
      marginBottom: "1rem",
      [theme.breakpoints.down("md")]: {
        display: "none !important",
      },
    },
    gameAlert: {
      [theme.breakpoints.up("md")]: {
        display: "none !important",
      },
    },
    downloadBlock: {
      justifyContent: "center",
      alignItems: "center",
    },
    footer: {
      borderTop: "1px solid",
      backgroundColor: theme.palette.primary.main,
      color: "#fff",
      textAlign: "center",
      paddingTop: "20px",
      paddingBottom: "20px",
      position: "fixed",
      left: "0",
      bottom: "0",
      width: "100vw",
      maxWidth: "inherit",
      zIndex: 100,
    },
    multiProgressContainer: {
      width: "92%",
      height: "10px",
      position: "relative",
      border: "0",
      overflow: "hidden",
      margin: "auto",
      borderRadius: "400px",
    },
    multiProcessBackground: {
      backgroundColor: "#fff",
      width: "100%",
      height: "100%",
      position: "absolute",
      top: 0,
      left: 0,
    },
    multiProgressElement: {
      backgroundColor: "#fff",
      width: "10%", //Change
      zIndex: 8,
      height: "100%",
      top: 0,
      left: "0",
      position: "absolute",
      transition: "width 0.6s ease-in-out, left 6s ease-in-out",
      color: "red",
      textAlign: "center",
      fontSize: 8,
    },
  })
);
