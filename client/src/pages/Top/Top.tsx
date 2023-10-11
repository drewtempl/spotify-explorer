import React, { useEffect, useState } from "react";
import {
  Button,
  List,
  ListItem,
  Box,
  ListItemText,
  Paper,
  Container,
  ListSubheader,
  Tabs,
  Tab,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Stack,
} from "@mui/material";
import TopProps from "./Top.types";
import axios from "axios";
import NavBar from "../../components/NavBar";
import SongItem from "../../components/SongItem";
import "../../App.css";
import SongItemList from "../../components/SongItemList";

export const Top: React.FC<TopProps> = ({ userData }: TopProps) => {
  const [topTracks, setTopTracks] = useState([]);
  const [activeTab, setActiveTab] = useState("short_term");
  const [isDisabled, setIsDisabled] = useState<string[]>([]);

  const getTopTracks = (timeframe: string): void => {
    axios
      .get(`/api/top-tracks/${timeframe}`)
      .then((res) => {
        // console.log(res.data);
        setTopTracks(res.data.items);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const createPlaylist = (timeframe: string, count: number): void => {
    axios
      .post(`/api/create-playlist/${timeframe}/${count}`)
      .then((res) => {
        // console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChange = (event: SelectChangeEvent) => {
    setActiveTab(event.target.value);
    getTopTracks(event.target.value);
  };

  useEffect(() => {
    getTopTracks("short_term");
  }, []);

  return (
    <>
      {/* <SongItemList data={topTracks}></SongItemList> */}
      <Container
      >
        {/* <h1>Your Top Tracks</h1> */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '30px', textAlign: 'center', mt: 2, mb: 2 }}>
          <Typography variant="h4">Your Top Tracks</Typography>
          {/* <Tabs
            sx={{ marginLeft: "-15px", marginRight: "-15px" }}
            value={activeTab}
            onChange={handleChange}
          >
            <Tab label="Last 4 weeks" value={"short_term"}></Tab>
            <Tab label="Last 6 months" value={"medium_term"}></Tab>
            <Tab label="All time" value={"long_term"}></Tab>
          </Tabs> */}

          {/* <Box sx={{ display: 'flex', gap: '15px', alignItems: 'center', }}> */}
          <Stack direction='row' spacing={3} alignItems="center">
            <FormControl  sx={{ minWidth: '150px' }}>
              <InputLabel id="demo-simple-select-label">Time Period</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={activeTab}
                label="Time Period"
                onChange={handleChange}
              >
                <MenuItem value={"short_term"}>Last 4 weeks</MenuItem>
                <MenuItem value={"medium_term"}>Last 6 months</MenuItem>
                <MenuItem value={"long_term"}>All time</MenuItem>
              </Select>
            </FormControl>
            <Button
              sx={{ flex: 'none' }}
              onClick={() => {
                createPlaylist(activeTab, 20);
                setIsDisabled(isDisabled.concat(activeTab));
              }}
              variant="contained"
              color="success"
              disabled={isDisabled.includes(activeTab)}
            >
              {isDisabled.includes(activeTab)
                ? "Playlist created!"
                : "Create playlist"}
            </Button>
          </Stack>
          {/* </Box> */}

          {/* <Button
            onClick={() => {
              createPlaylist(activeTab, 20);
              setIsDisabled(isDisabled.concat(activeTab));
            }}
            variant="contained"
            color="success"
            disabled={isDisabled.includes(activeTab)}
          >
            {isDisabled.includes(activeTab)
              ? "Playlist created!"
              : "Create playlist"}
          </Button> */}
        </Box>

        <Box className="vertical">
          <SongItemList data={topTracks}></SongItemList>
          {/* <Paper elevation={8}>
            <Container>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "stretch",
                  gap: "15px",
                }}
              >
                <Tabs
                  sx={{ marginLeft: "-15px", marginRight: "-15px" }}
                  value={activeTab}
                  onChange={handleChange}
                >
                  <Tab label="Last 4 weeks" value={"short_term"}></Tab>
                  <Tab label="Last 6 months" value={"medium_term"}></Tab>
                  <Tab label="All time" value={"long_term"}></Tab>
                </Tabs>
                <Button
                  onClick={() => {
                    createPlaylist(activeTab, 20);
                    setIsDisabled(isDisabled.concat(activeTab));
                  }}
                  variant="contained"
                  color="success"
                  disabled={isDisabled.includes(activeTab)}
                >
                  {isDisabled.includes(activeTab)
                    ? "Playlist created!"
                    : "Create playlist"}
                </Button>
              </Box>
            </Container>
            <List dense>
              {topTracks.map((el: any, index) => {
                return <SongItem data={el} index={index} />;
              })}
            </List>
          </Paper> */}
        </Box>
      </Container >
    </>
  );
};
