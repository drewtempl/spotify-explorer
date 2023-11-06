import { Box, IconButton, ListItemText, Paper, Table, TableBody, TableCell, TableHead, TableRow, useMediaQuery } from "@mui/material";
import React, { useEffect, useState } from "react";
import "../../App.css";
import PlayCircleFilled from '@mui/icons-material/PlayCircleFilled';
import PauseCircleFilled from '@mui/icons-material/PauseCircleFilled';
import { SongItemListProps, TrackData } from './SongItemList.types';

export const SongItemList: React.FC<SongItemListProps> = ({ data }) => {
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
        <Box className="vertical" sx={{ mb: 3 }}>
            <Table sx={{ tableLayout: 'fixed', width: '100%' }} >
                <TableHead>
                    <TableRow>
                        {matches && <TableCell >#</TableCell>}
                        <TableCell width={matches ? "60px" : "40px"} />
                        <TableCell width={matches ? "55%" : "65%"} sx={{ pl: 5 }}>{matches && 'Title'}</TableCell>
                        {matches && <TableCell width="18%">Popularity</TableCell>}
                        <TableCell width={matches ? "12%" : "auto"}>{matches && 'Preview'}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((track: any, index: number) => (
                        <TableRow>
                            {matches && <TableCell >
                                <span>{index + 1}.</span>
                            </TableCell>}
                            <TableCell>
                                <Box>
                                    <img
                                        style={{ height: matches ? '60px' : '40px', width: matches ? '60px' : '40px' }}
                                        src={track.album.images[0].url}
                                        alt="album artwok"
                                    ></img>
                                </Box>
                            </TableCell>

                            <TableCell>
                                <Box display="flex" gap="15px" alignItems="center">

                                    <ListItemText sx={{ pl: 3 }} primary={track.name} secondary={track.artists[0].name} />
                                </Box>
                            </TableCell>
                            {matches && <TableCell sx={{ pl: 4 }}>
                                <Paper
                                    elevation={4}
                                    sx={{ "justify-self": "flex-end", p: "5px", textAlign: "center", maxWidth: 'fit-content' }}
                                >
                                    {track.popularity}
                                </Paper>
                            </TableCell>}
                            <TableCell >
                                {track.preview_url ?
                                    <IconButton color='success' size='large' onClick={() => handlePreview(index)}>
                                        {index === audioIndex ? <PauseCircleFilled /> : <PlayCircleFilled />}
                                    </IconButton>
                                    : null}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Box>
    )
}