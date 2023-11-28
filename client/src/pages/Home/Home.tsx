import React from "react";
import { Button, Container, Typography, Stack } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import HomeProps from "./Home.types";

export const Home: React.FC<HomeProps> = ({ loginHandler }: HomeProps) => {
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
    <Container sx={{ mt: 15 }}>
      <Stack alignItems="center" gap={3} textAlign="center">
        <Typography variant="h3" gutterBottom>
          Playlist Premier
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Create Spotify playlists from your most played songs, genre
          recommendations, and AI prompts
        </Typography>
        <Button
          variant="outlined"
          sx={{ marginTop: "20px" }}
          onClick={() => getLoginUrl()}
        >
          Login with Spotify
        </Button>
      </Stack>
    </Container>
  );
};
