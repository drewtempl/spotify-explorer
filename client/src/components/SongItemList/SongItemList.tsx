import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  ListItemText,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import "../../App.css";
import OpenInNew from "@mui/icons-material/OpenInNew";
import PlayCircleFilled from "@mui/icons-material/PlayCircleFilled";
import PauseCircleFilled from "@mui/icons-material/PauseCircleFilled";
import { SongItemListProps, TrackData } from "./SongItemList.types";

export const SongItemList: React.FC<SongItemListProps> = ({
  data,
  isLoading,
  url,
  clickHandler,
}) => {
  const [audio, setAudio] = useState<HTMLAudioElement>();
  const [audioIndex, setAudioIndex] = useState<number | null>();

  const matches = useMediaQuery("(min-width: 600px)");

  const handlePreview = (index: number) => {
    if (index === audioIndex) {
      audio?.pause();
      setAudioIndex(null);
    } else {
      if (audio) {
        audio.pause();
      }
      const audioElement = new Audio(data[index]?.preview_url);
      audioElement.play();
      setAudio(audioElement);
      setAudioIndex(index);
    }
  };

  return (
    <Stack mt={2} mb={2} gap={2} alignItems="center">
      {isLoading ? (
        <CircularProgress />
      ) : url ? (
        <Button
          href={url}
          target="_blank"
          variant="contained"
          color="success"
          sx={{ height: "40px" }}
          endIcon={<OpenInNew />}
        >
          View on Spotify
        </Button>
      ) : (
        <Button
          variant="contained"
          sx={{ height: "40px" }}
          onClick={clickHandler}
        >
          Add playlist to Spotify
        </Button>
      )}
      <Table sx={{ tableLayout: "fixed", width: "100%" }}>
        <TableHead>
          <TableRow>
            {matches && <TableCell>#</TableCell>}
            <TableCell width={matches ? "60px" : "40px"} />
            <TableCell width={matches ? "55%" : "65%"} sx={{ pl: 5 }}>
              {matches && "Title"}
            </TableCell>
            {matches && <TableCell width="18%">Popularity</TableCell>}
            <TableCell width={matches ? "12%" : "auto"}>
              {matches && "Preview"}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((track: any, index: number) => (
            <TableRow>
              {matches && (
                <TableCell>
                  <span>{index + 1}.</span>
                </TableCell>
              )}
              <TableCell>
                <Box>
                  <img
                    style={{
                      height: matches ? "60px" : "40px",
                      width: matches ? "60px" : "40px",
                    }}
                    src={track.album.images[track.album.images.length - 1].url}
                    alt="album artwok"
                  ></img>
                </Box>
              </TableCell>

              <TableCell>
                <Box display="flex" gap="15px" alignItems="center">
                  <ListItemText
                    sx={{ pl: 3 }}
                    primary={track.name}
                    secondary={track.artists[0].name}
                  />
                </Box>
              </TableCell>
              {matches && (
                <TableCell sx={{ pl: 4 }}>
                  <Paper
                    elevation={4}
                    sx={{
                      justifySelf: "flex-end",
                      p: "5px",
                      textAlign: "center",
                      maxWidth: "fit-content",
                    }}
                  >
                    {track.popularity}
                  </Paper>
                </TableCell>
              )}
              <TableCell>
                {track.preview_url ? (
                  <IconButton
                    color="success"
                    size="large"
                    onClick={() => handlePreview(index)}
                  >
                    {index === audioIndex ? (
                      <PauseCircleFilled />
                    ) : (
                      <PlayCircleFilled />
                    )}
                  </IconButton>
                ) : null}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Stack>
  );
};
