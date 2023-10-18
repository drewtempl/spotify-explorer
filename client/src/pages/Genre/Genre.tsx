import { Box, Button, Container, Grid, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import SongItemList from "../../components/SongItemList";

export const Genre: React.FC<any> = ({ userData }) => {
  const [genres, setGenres] = useState<string[]>();
  const [activeGenres, setActiveGenres] = useState<string[]>([]);

  const getGenres = () => {
    axios
      .get("/api/genres")
      .then((res) => {
        setGenres(res.data.genres);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const createPlaylist = (genres: string[], limit: number): void => {
    axios
      .post("/api/playlist/genres", { genres: genres, limit: limit })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleClick = (genre: string) => {
    if (activeGenres?.includes(genre)) {
      const arr = activeGenres.filter((el) => el !== genre);
      setActiveGenres(arr);
    } else if (activeGenres.length < 5) {
      setActiveGenres(activeGenres?.concat(genre));
    }
  };

  const handleCreate = () => {
    createPlaylist(activeGenres, 3);
  };

  useEffect(() => {
    getGenres();
  }, []);

  return (
    <>
      <Container
        sx={{
          display: "flex",
          "flex-direction": "column",
          "align-items": "center",
          textAlign: "center",
          gap: "15px",
          pt: '20px'
        }}
      >
        <Typography variant="h4">Genre Recommendations</Typography>
        <Typography variant="subtitle1">Select up to 5 genres</Typography>        
        <Button
          disabled={!activeGenres.length}
          variant="contained"
          color="success"
          onClick={handleCreate}
          sx={{marginBottom: "30px"}}
        >
          Create Playlist
        </Button>
      </Container>
      <Container>
        <Grid container spacing={1.5} justifyContent="space-between">
          {genres?.map((genre, index) => {
            return (
              <Grid
                item
                xs={2}
                sx={{ minWidth: "100px", maxWidth: "130px" }}
                flexGrow={1}
              >
                <Paper
                  onClick={() => handleClick(genre)}
                  className={
                    activeGenres?.includes(genre)
                      ? "genre-btn-active"
                      : "genre-btn"
                  }
                  sx={{ height: "60px", minWidth: "100px" }}
                >
                  <p>{genre}</p>
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </>
  );
};
