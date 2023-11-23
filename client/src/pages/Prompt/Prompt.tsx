import {
  Box,
  Button,
  CircularProgress,
  Container,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import CountDropdown from "../../components/CountDropdown";
import { TrackData } from "../../components/SongItemList/SongItemList.types";
import SongItemList from "../../components/SongItemList";

export const Prompt: React.FC = () => {
  const [tracks, setTracks] = useState<TrackData[] | null>();
  const [trackCount, setTrackCount] = useState("10");
  const [prompt, setPrompt] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCreateLoading, setIsCreateLoading] = useState(false);
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [url, setUrl] = useState<string | undefined>();

  const countValues = [10, 15, 20, 25, 30];

  const getTracks = () => {
    axios
      .get("/api/openai", {
        params: {
          prompt: prompt,
          limit: trackCount,
        },
      })
      .then((res) => {
        setIsLoading(false);
        setTracks(res.data.tracks);
        setTitle(res.data.title);
        setDescription(res.data.description);
        // console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const createPlaylist = (track_ids: string[]) => {
    axios
      .post("/api/create-playlist/openai", {
        title: title,
        description: description,
        track_ids: track_ids,
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

  const handleCountChange = (event: SelectChangeEvent) => {
    setTrackCount(event.target.value);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    setError(false);
    setIsLoading(true);
    setTracks(null);

    if (prompt === "") {
      setError(true);
    } else {
      // console.log(prompt);
      getTracks();
    }
  };

  const handleChange = (event: any) => {
    setError(false);
    setPrompt(event.target.value);
  };

  const handleCreate = () => {
    if (tracks) {
      setIsCreateLoading(true);
      const track_ids = tracks.map((val) => val.id);

      createPlaylist(track_ids);
    }
  };

  return (
    <Container
      sx={{
        display: "flex",
        "flex-direction": "column",
        "align-items": "stretch",
        textAlign: "center",
        gap: "30px",
        pt: "20px",
      }}
    >
      <Typography variant="h4">AI playlist generator</Typography>
      <Typography variant="subtitle1">
        Generate playlists using a prompt
      </Typography>
      <Box component="form" onSubmit={handleSubmit} autoComplete="off">
        <TextField
          label="Send a prompt"
          variant="outlined"
          fullWidth
          error={error}
          onChange={handleChange}
          sx={{ mb: 3 }}
        />
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
              <Button fullWidth variant="contained" type="submit">
                Generate playlist
              </Button>
            )}
          </Stack>
        </Stack>
      </Box>
      {tracks ? (
        <SongItemList
          data={tracks}
          isLoading={isCreateLoading}
          url={url}
          clickHandler={handleCreate}
        />
      ) : null}
    </Container>
  );
};
