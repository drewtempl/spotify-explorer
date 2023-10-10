import { Box, ListItemText, Paper, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import React from "react";
import "../../App.css";


export const SongItemList: React.FC<any> = ({ data }) => {


    return (
        <Table sx={{ maxWidth: 650 }} >
            <TableHead>
                <TableRow>
                    <TableCell className="col-hidden">#</TableCell>
                    <TableCell>Title</TableCell>
                    <TableCell>Popularity</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {data.map((track: any, index: number) => (
                    <TableRow>
                        <TableCell className="col-hidden">
                            <Box>
                                <span>{index + 1}.</span>
                            </Box>
                        </TableCell>
                        <TableCell>
                            <Box display="flex" gap="15px">
                                <Box>
                                    <img
                                        style={{ height: "60px", width: "auto" }}
                                        src={track.album.images[0].url}
                                        alt=""
                                    ></img>
                                </Box>
                                <ListItemText primary={track.name} secondary={track.artists[0].name} />
                            </Box>
                        </TableCell>
                        <TableCell>
                            <Paper
                                elevation={4}
                                sx={{ "justify-self": "flex-end", padding: "5px", textAlign: "center", maxWidth: 'fit-content' }}
                            >
                                {track.popularity}
                            </Paper>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}