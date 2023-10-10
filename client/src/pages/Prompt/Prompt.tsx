import { Box, Button, Container, Grid, Paper, TextField } from "@mui/material";
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
            }}
        >
            <h1>AI playlist generator</h1>
            <h2>Generate playlists using a prompt</h2>
            <TextField label="Send a prompt" variant="outlined" fullWidth/>
            <TextField defaultValue="10" type="number" label="# of songs" variant="outlined" inputProps={inputProps} />
            <Button  variant="contained" color="success">Create playlist</Button>
        </Container>
    )
}