import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Stack,
} from "@mui/material";
import axios from "axios";
import "../../App.css";
import SongItemList from "../../components/SongItemList";
import { TrackData } from "../../components/SongItemList/SongItemList.types";
import CountDropdown from "../../components/CountDropdown";

export const Top: React.FC = () => {
  const [topTracks, setTopTracks] = useState<TrackData[]>([]);
  const [activeTab, setActiveTab] = useState("short_term");
  const [isLoading, setIsLoading] = useState(false);
  const [trackCount, setTrackCount] = useState("10");
  const [isDisabled, setIsDisabled] = useState<any>([]);

  const countValues = [10, 20, 50, 99];

  const getTopTracks = (timeframe: string, count: string): void => {
    axios
      .get(`/api/top-tracks`, {
        params: {
          timeframe: timeframe,
          count: count,
        },
      })
      .then((res) => {
        // console.log(res.data);
        setTopTracks(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const createPlaylist = (timeframe: string, count: string): void => {
    setIsLoading(true);

    axios
      .post(`/api/create-playlist/${timeframe}/${count}`)
      .then((res) => {
        // console.log(res.data);
        setIsLoading(false);
        setIsDisabled(
          isDisabled.concat({ name: activeTab + trackCount, url: res.data })
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleTimeChange = (event: SelectChangeEvent) => {
    setActiveTab(event.target.value);
    getTopTracks(event.target.value, trackCount);
  };

  const handleCountChange = (event: SelectChangeEvent) => {
    setTrackCount(event.target.value);
    getTopTracks(activeTab, event.target.value);
  };

  const isInactive = (): boolean => {
    return isDisabled.some((e: any) => e.name === activeTab + trackCount);
  };

  const getUrl = (): string => {
    const element = isDisabled.find(
      (el: any) => el.name === activeTab + trackCount
    );
    if (element) {
      return element.url;
    } else {
      return element;
    }
  };

  const handleCreate = () => {
    setIsLoading(true);
    createPlaylist(activeTab, trackCount);
  };

  useEffect(() => {
    getTopTracks("short_term", trackCount);
  }, []);

  return (
    <Container>
      <Stack alignItems="center" gap={5} mt={4} mb={4}>
        <Typography variant="h4">Your Top Songs on Spotify</Typography>
        <Stack direction="row" spacing={3} alignItems="center">
          <FormControl sx={{ minWidth: "150px" }}>
            <InputLabel id="time-select-label">Time Period</InputLabel>
            <Select
              labelId="time-select-label"
              id="time-select"
              value={activeTab}
              label="Time Period"
              onChange={handleTimeChange}
            >
              <MenuItem value={"short_term"}>Last 4 weeks</MenuItem>
              <MenuItem value={"medium_term"}>Last 6 months</MenuItem>
              <MenuItem value={"long_term"}>All time</MenuItem>
            </Select>
          </FormControl>

          <CountDropdown
            trackCount={trackCount}
            countHandler={handleCountChange}
            values={countValues}
          />
        </Stack>
      </Stack>
      <SongItemList
        data={topTracks}
        isLoading={isLoading}
        url={getUrl()}
        clickHandler={handleCreate}
      ></SongItemList>
    </Container>
  );
};
