import React from "react";
import { AppBar, Container } from "@mui/material";
import TopProps from "../../pages/Top/Top.types";

export const NavBar: React.FC<TopProps> = ({ userData }: TopProps) => {
  return (
    <AppBar position="static" >
      <Container sx={{ display: "flex", flexDirection: "row", justifyContent: 'space-between' }}>
        <h3>Playlist Premier</h3>
        <h3>Hi, {userData?.display_name}</h3>
      </Container>
    </AppBar>
  );
};
