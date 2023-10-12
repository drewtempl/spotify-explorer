import React from "react";
import {
  AppBar,
  Box,
  Container,
  IconButton,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import TopProps from "../../pages/Top/Top.types";
import MenuIcon from "@mui/icons-material/Menu";

export const NavBar: React.FC<TopProps> = ({ userData }: TopProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log(event);
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (event: any) => {
    console.log(event);

    setAnchorEl(null);
  };

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
          pl={2}
          pr={2}
        >
          <Box>
            <IconButton sx={{ mr: 2 }} onClick={handleClick}>
              <MenuIcon />
            </IconButton>

            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
            >
              <MenuItem selected onClick={handleClose}>
                <ListItemText primary="Top Songs"></ListItemText>
              </MenuItem>
              <MenuItem onClick={handleClose}>Genre Recommendations</MenuItem>
              <MenuItem onClick={handleClose}>AI Playlist Generator</MenuItem>
            </Menu>
          </Box>

          <Typography variant="h6">Playlist Premier</Typography>
        </Stack>
        <Typography variant="h6">Hi, {userData?.display_name}</Typography>
      </Toolbar>
    </AppBar>
  );
};
