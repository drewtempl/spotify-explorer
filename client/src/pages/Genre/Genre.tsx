import {
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import SongItemList from "../../components/SongItemList";
import { Track } from "../Top/Top.types";
import qs from "qs";

export const Genre: React.FC<any> = ({ userData }) => {
  const [tracks, setTracks] = useState<Track[]>();
  const [genres, setGenres] = useState<string[]>();
  const [activeGenres, setActiveGenres] = useState<string[]>([]);
  const [recommendations, setRecommendations] = useState();

  const getGenres = () => {
    console.log("Getting genres")
    axios
      .get("/api/genres")
      .then((res) => {
        setGenres(res.data.genres);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getRecommendations = (recGenres: string, limit: number) => {
    axios
      .get("/api/recommendations", {
        params: {
          recGenres: recGenres,
          limit: limit,
        }
      })
      .then((res) => {
        setRecommendations(res.data);
        console.log(res.data);
        // setGenres(res.data.genres);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // const createPlaylist = (genres: string[], limit: number): void => {
  //   axios
  //     .post("/api/playlist/genres", { genres: genres, limit: limit })
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  const handleClick = (genre: string) => {
    if (activeGenres?.includes(genre)) {
      const arr = activeGenres.filter((el) => el !== genre);
      setActiveGenres(arr);
    } else if (activeGenres.length < 5) {
      setActiveGenres(activeGenres?.concat(genre));
    }
  };

  const handleRecs = () => {
    const recGenres = activeGenres.toString();
    getRecommendations(recGenres, 3);
  };

  useEffect(() => {
    getGenres();
  }, []);


  console.log(genres)

  return (
    <Container>
      <Container
        sx={{
          display: "flex",
          "flex-direction": "column",
          "align-items": "center",
          textAlign: "center",
          gap: "15px",
          pt: "20px",
        }}
      >
        <Typography variant="h4">Genre Recommendations</Typography>
        <Typography variant="subtitle1">Select up to 5 genres</Typography>
        <Button
          disabled={!activeGenres.length}
          variant="contained"
          onClick={handleRecs}
          sx={{ marginBottom: "30px" }}
        >
          Generate Playlist
        </Button>
      </Container>
      {!recommendations ?
        <Container sx={{mb: 3}}>
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
        :
        <SongItemList data={recommendations}></SongItemList>
      }
    </Container>
  );
};
