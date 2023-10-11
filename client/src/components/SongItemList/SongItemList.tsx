import { Box, IconButton, ListItemText, Paper, Table, TableBody, TableCell, TableHead, TableRow, useMediaQuery } from "@mui/material";
import React, { useEffect, useState } from "react";
import "../../App.css";
import PlayCircleFilled from '@mui/icons-material/PlayCircleFilled';
import PauseCircleFilled from '@mui/icons-material/PauseCircleFilled';

export const SongItemList: React.FC<any> = ({ data }) => {
    const [audio, setAudio] = useState<HTMLAudioElement>()
    const [audioIndex, setAudioIndex] = useState<number | null>();
    const matches = useMediaQuery('(min-width: 600px)');

    const handlePreview = (index: number) => {
        if (index === audioIndex) {
            audio?.pause();
            setAudioIndex(null);
        }
        else {
            if (audio) {
                audio.pause();
            }
            const audioElement = new Audio(data[index]?.preview_url)
            audioElement.play();
            setAudio(audioElement);
            setAudioIndex(index);
        }
    }


    return (
        <Table >
        {/* <Table sx={{tableLayout: 'fixed', width: '100%'}}> */}
            <TableHead>
                <TableRow>
                    {matches && <TableCell>#</TableCell>}
                    <TableCell>Title</TableCell>
                    {matches && <TableCell>Popularity</TableCell>}
                    <TableCell sx={{padding: 0}}>Preview</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {data.map((track: any, index: number) => (
                    <TableRow>
                        {matches && <TableCell>
                            <Box>
                                <span>{index + 1}.</span>
                            </Box>
                        </TableCell>}
                        <TableCell>
                            <Box display="flex" gap="15px" alignItems="center">
                                <Box>
                                    <img
                                        style={{ height: matches ? '60px' : '40px', width: "auto" }}
                                        src={track.album.images[0].url}
                                        alt="album artwok"
                                    ></img>
                                </Box>
                                <ListItemText primary={track.name} secondary={track.artists[0].name} />
                            </Box>
                        </TableCell>
                        {matches && <TableCell>
                            <Paper
                                elevation={4}
                                sx={{ "justify-self": "flex-end", padding: "5px", textAlign: "center", maxWidth: 'fit-content' }}
                            >
                                {track.popularity}
                            </Paper>
                        </TableCell>}
                        <TableCell sx={{padding: 0}}>
                            <IconButton color='success' size='large' onClick={() => handlePreview(index)}>
                                {index === audioIndex ? <PauseCircleFilled /> : <PlayCircleFilled />}
                            </IconButton>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}