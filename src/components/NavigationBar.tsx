import {
  AppBar,
  Box,
  Fab,
  IconButton,
  MenuItem,
  Toolbar,
  Menu,
  Typography,
} from "@mui/material";
import * as React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import SearchIcon from "@mui/icons-material/Search";
import { ScrollTop } from "./ScrollTop";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

export const NavigationBar: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const navigate = useNavigate();
  const leftNavItems = [
    {
      title: "Home",
      page: "/",
    },
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
    {
      title: "Photo Search through Pexel",
      page: "/photo-search",
    },
    {
      title: "Create your own resume",
      href: "https://www.mydigiresume.com",
    },
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar>
        <Toolbar>
          <IconButton color="inherit" edge="start">
            <MenuIcon />
          </IconButton>
          &nbsp;&nbsp;&nbsp; &nbsp; &nbsp; &nbsp;
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Projects
          </Typography>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleMenu}
          >
            <SearchIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {leftNavItems.map((item, index) => {
              return (
                <React.Fragment>
                  {item.page ? (
                    <MenuItem
                      key={index + item.title}
                      component={RouterLink}
                      to={item.page}
                      onClick={() => {
                        handleClose();
                        navigate(item.page);
                      }}
                    >
                      {item.title}
                    </MenuItem>
                  ) : (
                    <React.Fragment>
                      <MenuItem
                        key={index + item.title}
                        component="a"
                        onClick={() => {
                          handleClose();
                          window.open(item.href, "_blank");
                        }}
                      >
                        {item.title}
                        <IconButton aria-label="new-tag-icon">
                          <OpenInNewIcon />
                        </IconButton>
                      </MenuItem>
                    </React.Fragment>
                  )}
                </React.Fragment>
              );
            })}
          </Menu>
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
