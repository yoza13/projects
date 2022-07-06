import {
  AppBar,
  Box,
  Fab,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  SwipeableDrawer,
  Toolbar,
} from "@mui/material";
import * as React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { useStyles } from "../useStyles";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { ScrollTop } from "./ScrollTop";

export const NavigationBar: React.FC = () => {
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const navigate = useNavigate();
  const leftNavItems = [
    {
      title: "Weather App",
      page: "/weather-app",
    },
    {
      title: "Calculator",
      page: "/calculator",
    },
    {
      title: "To Do",
      page: "/todo",
    },
    {
      title: "Mine-Sweeper (Single Player Game)",
      page: "/mine-sweeper",
    },
  ];
  const drawer = () => {
    const classes = useStyles();
    return (
      <Box onClick={() => setOpenDrawer(false)}>
        <List component="ul" className={classes.listStyleDisc}>
          {leftNavItems.map((item, index) => {
            return (
              <ListItem
                key={index + item.title}
                component={RouterLink}
                to={item.page}
                className={classes.drawerListItem}
              >
                <ListItemButton
                  sx={{ pl: 4 }}
                  onClick={() => {
                    navigate(item.page);
                  }}
                >
                  <ListItemText primary={item.title} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>
    );
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={() => setOpenDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          &nbsp;&nbsp;&nbsp; &nbsp; &nbsp; &nbsp;
          <Link
            underline="none"
            href="/"
            color="#fff"
            variant="h5"
            sx={{ letterSpacing: "0.1em" }}
          >
            Projects
          </Link>
          <SwipeableDrawer
            open={openDrawer}
            onClose={() => setOpenDrawer(false)}
            onOpen={() => setOpenDrawer(true)}
            PaperProps={{
              sx: {
                width: "300px",
              },
            }}
          >
            {drawer()}
          </SwipeableDrawer>
        </Toolbar>
      </AppBar>
      <Toolbar id="back-to-top-anchor" />
      <ScrollTop>
        <Fab size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </Box>
  );
};
