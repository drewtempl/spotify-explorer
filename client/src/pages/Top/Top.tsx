import React, { useEffect, useState } from 'react';
import { Button, List, ListItem, Box, ListItemText, Paper } from '@mui/material';
import TopProps from './Top.types';
import axios from 'axios';
import NavBar from '../../components/NavBar';


export const Top: React.FC<TopProps> = ({ userData }: TopProps) => {
    const [topTracks, setTopTracks] = useState([]);

    const getTopTracks = (): void => {
        axios.get('http://127.0.0.1:5000/api/top-tracks/short_term')
            .then(res => {
                console.log(res.data);
                setTopTracks(res.data.items);
            })
            .catch(error => {
                console.log(error);
            })
    }

    useEffect(() => {
        getTopTracks();
    }, []);

    return (
        <>
            <NavBar userData={userData} />
            <div>Top</div>
            <Box sx={{ 'max-width': '50%' }}>
                <Paper elevation={8}>
                    <List dense>
                        {topTracks.map((el: any, index) => {
                            return <ListItem >
                                <span>{index + 1}.</span>
                                <ListItemText primary={el.name} secondary={el.artists[0].name} />
                            </ListItem>
                        })}
                    </List>
                </Paper>
            </Box >
        </>
    )
}