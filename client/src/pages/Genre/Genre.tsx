import {
  Button,
  CircularProgress,
  Container,
  Grid,
  Paper,
  SelectChangeEvent,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import SongItemList from "../../components/SongItemList";
import { TrackData } from "../../components/SongItemList/SongItemList.types";
import CountDropdown from "../../components/CountDropdown";

export const Genre: React.FC<any> = () => {
  const [tracks, setTracks] = useState<TrackData[] | null>();
  const [genres, setGenres] = useState<string[]>();
  const [activeGenres, setActiveGenres] = useState<string[]>([]);
  const [trackCount, setTrackCount] = useState("10");
  const [isLoading, setIsLoading] = useState(false);
  const [isCreateLoading, setIsCreateLoading] = useState(false);
  const [url, setUrl] = useState<string | undefined>();

  const matches = useMediaQuery("(min-width: 600px)");
  const countValues = [10, 20, 30, 50, 75, 99];

  const getGenres = () => {
    // console.log("Getting genres");
    axios
      .get("/api/genres")
      .then((res) => {
        setGenres(res.data.genres);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getRecommendations = (recGenres: string, limit: string) => {
    axios
      .get("/api/recommendations", {
        params: {
          recGenres: recGenres,
          limit: limit,
        },
      })
      .then((res) => {
        setIsLoading(false);
        setTracks(res.data);
        // console.log(res.data);
        // setGenres(res.data.genres);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const createPlaylist = (ids = ""): void => {
    axios
      .post("/api/create-playlist/recommendations", {
        ids: ids,
      })
      .then((res) => {
        setIsCreateLoading(false);
        setUrl(res.data);
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleClick = (genre: string) => {
    if (activeGenres.includes(genre)) {
      const arr = activeGenres.filter((el) => el !== genre);
      setActiveGenres(arr);
    } else if (activeGenres.length < 5) {
      setActiveGenres(activeGenres?.concat(genre));
    }
  };

  const handleRecs = () => {
    setIsLoading(true);
    setUrl(undefined);
    const recGenres = activeGenres.toString();
    getRecommendations(recGenres, trackCount);
  };

  const handleCountChange = (event: SelectChangeEvent) => {
    setTrackCount(event.target.value);
  };

  const handleReset = () => {
    setTracks(null);
    setActiveGenres([]);
    setTrackCount("10");
  };

  const handleCreate = () => {
    setIsCreateLoading(true);
    const ids = getTrackIDs();

    createPlaylist(ids);
  };

  const getTrackIDs = () => {
    const ids = tracks?.map((val) => val.id);
    return ids?.toString();
  };

  useEffect(() => {
    getGenres();
  }, []);

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
        {!tracks ? (
          // {/* {!true ? ( */}
          <>
            <Typography variant="subtitle1">Select up to 5 genres</Typography>
            <Grid
              container
              columns={10}
              direction={matches ? "row" : "column"}
              alignItems="center"
              justifyContent="center"
              spacing={matches ? 2 : 2}
              padding={3}
            >
              <Grid item xs={3} md={2} display="flex" justifyContent="flex-end">
                <CountDropdown
                  trackCount={trackCount}
                  values={countValues}
                  countHandler={handleCountChange}
                />
              </Grid>
              <Grid item xs={3} md={2}>
                {isLoading ? (
                  <CircularProgress />
                ) : (
                  <Button fullWidth variant="contained" onClick={handleRecs}>
                    Generate Playlist
                  </Button>
                )}
              </Grid>
            </Grid>
          </>
        ) : (
          <>
            <Grid
              container
              direction={matches ? "row" : "column"}
              // alignItems="stretch"
              justifyContent="center"
              spacing={2}
              sx={{ mb: 4, mt: 0 }}
            >
              <Grid item xs={4} md={2.5} height="40px">
                {isLoading ? (
                  <CircularProgress />
                ) : (
                  <Button fullWidth variant="outlined" onClick={handleRecs}>
                    Regenerate
                  </Button>
                )}
              </Grid>
              <Grid item xs={4} md={2.5} height="40px">
                <Button fullWidth variant="outlined" onClick={handleReset}>
                  Select new genres
                </Button>
              </Grid>
              {/* <Grid item xs={4} md={3} height="40px">
                {isCreateLoading ? (
                  <CircularProgress color="success" />
                ) : (
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={handleCreate}
                    color="success"
                  >
                    Add playlist to Spotify
                  </Button>
                )}
              </Grid> */}
            </Grid>
          </>
        )}
      </Container>
      {!tracks ? (
        <Container sx={{ mb: 3 }}>
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
                      activeGenres.includes(genre)
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
      ) : (
        <SongItemList
          data={tracks}
          isLoading={isCreateLoading}
          url={url}
          clickHandler={handleCreate}
        ></SongItemList>
      )}
    </Container>
  );
};
