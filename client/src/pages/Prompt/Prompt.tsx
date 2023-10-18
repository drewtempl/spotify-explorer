import { Box, Button, Container, Grid, Paper, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";

export const Prompt: React.FC<any> = ({ }) => {

    const inputProps = {
        min: '1',
    };

    return (
        <Container
            sx={{
                display: "flex",
                "flex-direction": "column",
                "align-items": "center",
                textAlign: "center",
                gap: "30px",
                pt: '20px'
            }}
        >
            <Typography variant="h4">AI playlist generator</Typography>
            <Typography variant="subtitle1">Generate playlists using a prompt</Typography>
            <TextField label="Send a prompt" variant="outlined" fullWidth />
            <TextField defaultValue="10" type="number" label="# of songs" variant="outlined" inputProps={inputProps} />
            <Button variant="contained" color="success">Create playlist</Button>
        </Container>
    )
}