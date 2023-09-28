import React, { useEffect, useState } from 'react';
import { Button, List, ListItem, Box, ListItemText, Paper, Container } from '@mui/material';
import TopProps from './Top.types';
import axios from 'axios';
import NavBar from '../../components/NavBar';
import SongItem from '../../components/SongItem';
import '../../App.css';


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
            <Container>
                <div>Top</div>
                <Box className='list-wrapper'>
                    <Paper elevation={8}>
                        <List dense>
                            {topTracks.map((el: any, index) => {
                                return <SongItem data={el} index={index} />
                                // return <ListItem >
                                //     <span>{index + 1}.</span>
                                //     <ListItemText primary={el.name} secondary={el.artists[0].name} />
                                // </ListItem>
                            })}
                        </List>
                    </Paper>
                </Box >
            </Container>

        </>
    )
}