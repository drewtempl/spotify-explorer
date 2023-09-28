import { Box, ListItem, ListItemText, Paper } from '@mui/material'
import React from 'react'
import SongItemProps from './SongItem.types';


export const SongItem: React.FC<SongItemProps> = ({ data, index }: SongItemProps) => {
    const imageUrl = data.album.images[0].url;

    return (
        <ListItem key={index}>
            <Box sx={{ 'display': 'flex', 'align-items': 'center', 'gap': '30px', 'justify-content': 'space-between', 'flex': '1'}}>
                <Box sx={{ 'width': '20px'}}>
                    <span>{index + 1}.</span>
                </Box>
                <Box>
                    <img style={{ 'height': '60px', 'width': 'auto' }} src={imageUrl}></img>
                </Box>
                <ListItemText primary={data.name} secondary={data.artists[0].name} />
                <Paper elevation={4} sx={{ 'justify-self': 'flex-end', 'padding': '5px'}}>{data.popularity}</Paper>
            </Box>
        </ListItem>
    )
}

