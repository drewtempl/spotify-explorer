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
  const [isLoading, setIsLoading] = useState(false);
  const [trackCount, setTrackCount] = useState("10");
  const [playlistUrl, setPlaylistUrl] = useState<string>();

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

  const getTracks = (genres: string[], limit: string): void => {
    const genreParams = genres.map((el, index) => [index.toString(), el]);
    const params = new URLSearchParams(genreParams);
    params.append("limit", limit);

    axios
      .get("/api/recommendations/genres", {
        params: params,
      })
      .then((res) => {
        setIsLoading(false);
        setTracks(res.data);
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const createPlaylist = (): void => {
    axios
      .post("/api/create-playlist/recommendations")
      .then((res) => {
        setIsLoading(false);
        setPlaylistUrl(res.data);
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

  const handleGenerate = () => {
    setIsLoading(true);
    getTracks(activeGenres, trackCount);
    // createPlaylist(activeGenres, 3);
  };

  const handleCreate = () => {
    setIsLoading(true);
    createPlaylist();
  };

  const handleCountChange = (event: SelectChangeEvent) => {
    setTrackCount(event.target.value);
  };

  useEffect(() => {
    getGenres();
  }, []);


  console.log(genres)

  return (
    <>
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
        {tracks ? (
          <>
            <Typography variant="h4">Recommendation playlist</Typography>
            <Box height={"30px"} marginBottom={"30px"}>
              {isLoading ? (
                <CircularProgress />
              ) : playlistUrl ? (
                <Button
                  sx={{ flex: "none" }}
                  variant="contained"
                  color="success"
                  href={playlistUrl}
                  target="_blank"
                >
                  View on Spotify
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="success"
                  onClick={handleCreate}
                  sx={{ marginBottom: "30px" }}
                >
                  Add playlist to Spotify
                </Button>
              )}
            </Box>
          </>
        ) : (
          <>
            <Typography variant="h4">Genre Recommendations</Typography>
            <Typography variant="subtitle1">Select up to 5 genres</Typography>
            <FormControl sx={{ minWidth: "90px" }}>
              <InputLabel id="track-count-select-label"># of Tracks</InputLabel>
              <Select
                labelId="track-count-select-label"
                id="track-count-select"
                value={trackCount}
                label="# of Tracks"
                onChange={handleCountChange}
              >
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={20}>20</MenuItem>
                <MenuItem value={30}>30</MenuItem>
                <MenuItem value={50}>50</MenuItem>
                <MenuItem value={99}>99</MenuItem>
              </Select>
            </FormControl>
            <Box height={"30px"} marginBottom={"30px"}>
              {isLoading ? (
                <CircularProgress />
              ) : (
                <Button
                  disabled={!activeGenres.length}
                  variant="contained"
                  color="success"
                  onClick={handleGenerate}
                >
                  Generate Playlist
                </Button>
              )}
            </Box>
          </>
        )}
      </Container>
      <Container>
        {tracks ? (
          <SongItemList data={tracks} />
        ) : (
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
        )}
      </Container>
    </>
  );
};
