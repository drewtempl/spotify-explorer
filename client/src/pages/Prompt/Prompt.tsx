import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import CountDropdown from "../../components/CountDropdown";

export const Prompt: React.FC = () => {
  const [trackCount, setTrackCount] = useState("10");
  const [prompt, setPrompt] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  const countValues = [10, 15, 20, 25, 30];

  const getTracks = () => {
    axios
      .get("/api/openai", {
        params: {
          prompt: prompt,
        },
      })
      .then((res) => {
        console.log(res);
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

    if (prompt === "") {
      setError(true);
    } else {
      console.log(prompt);
      getTracks();
    }
  };

  const handleChange = (event: any) => {
    setError(false);
    setPrompt(event.target.value);
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
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          gap={3}
        >
          <CountDropdown
            trackCount={trackCount}
            values={countValues}
            countHandler={handleCountChange}
          />
          <Button variant="contained" type="submit">
            Generate playlist
          </Button>
        </Stack>
      </Box>
    </Container>
  );
};
