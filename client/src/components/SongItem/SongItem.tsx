import { Box, Grid, ListItem, ListItemText, Paper } from "@mui/material";
import React from "react";
import { SongItemProps } from "./SongItem.types";

export const SongItem: React.FC<SongItemProps> = ({
  data,
  index,
}: SongItemProps) => {
  const imageUrl = data.album.images[0].url;

  return (
    <ListItem key={index}>
      <Grid container alignItems={"center"}>
        <Grid item xs={1}>
          <Box sx={{ width: "20px" }}>
            <span>{index + 1}.</span>
          </Box>
        </Grid>
        <Grid item xs={3}>
          <Box>
            <img
              style={{ height: "60px", width: "auto" }}
              src={imageUrl}
              alt=""
            ></img>
          </Box>
        </Grid>
        <Grid item xs={7}>
          <ListItemText primary={data.name} secondary={data.artists[0].name} />
        </Grid>
        <Grid item xs={1} justifySelf={'flex-end'}>
          <Paper
            elevation={4}
            sx={{ "justify-self": "flex-end", padding: "5px", textAlign: "center", maxWidth: 'fit-content' }}
          >
            {data.popularity}
          </Paper>
        </Grid>
      </Grid>
    </ListItem>
  );
};
