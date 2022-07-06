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
      title: "Phot Search through Pexel",
      page: "/photo-search",
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
