import {
  Button,
  CircularProgress,
  Container,
  Grid,
  Paper,
  SelectChangeEvent,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import SongItemList from "../../components/SongItemList";
import Refresh from "@mui/icons-material/Refresh";
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

  const createPlaylist = (track_ids: string[], genres: string[]): void => {
    axios
      .post("/api/create-playlist/recommendations", {
        track_ids: track_ids,
        genres: genres,
      })
      .then((res) => {
        setIsCreateLoading(false);
        setUrl(res.data);
        // console.log(res);
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
    if (tracks) {
      setIsCreateLoading(true);
      const track_ids = tracks.map((val) => val.id);

      createPlaylist(track_ids, activeGenres);
    }
  };

  // const getTrackIDs = () => {
  //   const ids = tracks?.map((val) => val.id);
  //   return ids?.toString();
  // };

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
            <Stack direction="row" gap={2} justifyContent="center" margin={3}>
              <CountDropdown
                trackCount={trackCount}
                values={countValues}
                countHandler={handleCountChange}
              />
              <Stack alignItems="center" justifyContent="center" width="180px">
                {isLoading ? (
                  <CircularProgress />
                ) : (
                  <Button variant="contained" onClick={handleRecs}>
                    Generate playlist
                  </Button>
                )}
              </Stack>
            </Stack>
          </>
        ) : (
          <>
            <Grid
              container
              direction={matches ? "row" : "column"}
              justifyContent="center"
              spacing={2}
              maxWidth={matches ? "100%" : "80%"}
              sx={{ mb: 4, mt: 0 }}
            >
              <Grid item xs={4} md={2.5} height="40px">
                {isLoading ? (
                  <CircularProgress />
                ) : (
                  <Button
                    fullWidth
                    variant="outlined"
                    onClick={handleRecs}
                    endIcon={<Refresh />}
                  >
                    Regenerate
                  </Button>
                )}
              </Grid>
              <Grid item xs={4} md={2.5} height="40px">
                <Button fullWidth variant="outlined" onClick={handleReset}>
                  Select new genres
                </Button>
              </Grid>
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
        />
      )}
    </Container>
  );
};
