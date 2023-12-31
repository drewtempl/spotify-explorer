import React, { useEffect, useState } from "react";
import {
  AppBar,
  Box,
  IconButton,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate, useLocation } from "react-router-dom";
import NavBarProps from "./NavBar.types";

export const NavBar: React.FC<NavBarProps> = ({ userData }: NavBarProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedPage, setSelectedPage] = useState("/top");

  const matches = useMediaQuery("(min-width: 600px)");
  const navigate = useNavigate();
  const location = useLocation();
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (event: any, path: string, reason?: string) => {
    if (!reason) {
      navigate(path);
      setSelectedPage(path);
    }

    setAnchorEl(null);
  };

  useEffect(() => {
    setSelectedPage(location.pathname);
  }, [location.pathname]);

  return (
    <AppBar
      enableColorOnDark
      position="static"
      color="transparent"
      sx={{ borderBottom: "1px rgb(81, 81, 81) solid", p: 1 }}
    >
      <Toolbar variant="dense" sx={{ justifyContent: "space-between" }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          pr={2}
        >
          <Box>
            <IconButton sx={{ mr: 1 }} onClick={handleClick}>
              <MenuIcon />
            </IconButton>

            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={(event, reason) => handleClose(event, "", reason)}
            >
              <MenuItem
                selected={selectedPage === "/top"}
                onClick={(e) => handleClose(e, "/top")}
              >
                <ListItemText primary="Top Songs"></ListItemText>
              </MenuItem>
              <MenuItem
                selected={selectedPage === "/genre"}
                onClick={(e) => handleClose(e, "/genre")}
              >
                Genre Recommendations
              </MenuItem>
              <MenuItem
                selected={selectedPage === "/prompt"}
                onClick={(e) => handleClose(e, "/prompt")}
              >
                AI Playlist Generator
              </MenuItem>
              <MenuItem
                selected={selectedPage === "/"}
                onClick={(e) => handleClose(e, "/")}
              >
                Logout
              </MenuItem>
            </Menu>
          </Box>

          <Typography variant="h6">Playlist Premier</Typography>
        </Stack>
        {matches ? (
          <Typography variant="h6">Hi, {userData?.display_name}</Typography>
        ) : null}
      </Toolbar>
    </AppBar>
  );
};
