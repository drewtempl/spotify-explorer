import React, { SetStateAction, useState } from "react";
import { AppBar, Button, Container, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import HomeProps from "./Home.types";

export const Home: React.FC<HomeProps> = ({ loginHandler }: HomeProps) => {
  const [childWindow, setChildWindow] = useState<Window | null>(null);
  const navigate = useNavigate();

  const getLogin = (): void => {
    axios
      .get("/api/user")
      .then((res) => {
        // console.log(res.data);
        loginHandler(res.data);
        navigate("/top");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getLoginUrl = (): void => {
    axios
      .get("/api/login")
      .then((res) => {
        // console.log(res.data);
        openLoginWindow(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const openLoginWindow = (url: string) => {
    const checkChild = () => {
      if (child?.closed) {
        clearInterval(timer);
        getLogin();
      }
    };

    const child = window.open(url, "", "popup");
    const timer = setInterval(checkChild, 500);
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "30px",
        textAlign: "center"
      }}
    >
      <Typography variant="h3" gutterBottom>Playlist Premier</Typography>
      <Typography variant="subtitle1" gutterBottom>Create playlists from your most listened to tracks</Typography>
      <Button
        variant="outlined"
        sx={{ marginTop: "20px" }}
        onClick={() => getLoginUrl()}
      >
        Log in with Spotify
      </Button>
    </Container>
  );
};
