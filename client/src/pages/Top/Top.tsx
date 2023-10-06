import React, { useEffect, useState } from 'react';
import { Button, List, ListItem, Box, ListItemText, Paper, Container, ListSubheader, Tabs, Tab } from '@mui/material';
import TopProps from './Top.types';
import axios from 'axios';
import NavBar from '../../components/NavBar';
import SongItem from '../../components/SongItem';
import '../../App.css';


export const Top: React.FC<TopProps> = ({ userData }: TopProps) => {
    const [topTracks, setTopTracks] = useState([]);
    const [activeTab, setActiveTab] = useState('short_term');
    const [isDisabled, setIsDisabled] = useState<string[]>([]);


    const getTopTracks = (timeframe: string): void => {
        axios.get(`/api/top-tracks/${timeframe}`)
        // axios.get(`http://127.0.0.1:5000/api/top-tracks/${timeframe}`)
            .then(res => {
                console.log(res.data);
                setTopTracks(res.data.items);
            })
            .catch(error => {
                console.log(error);
            })
    }

    const createPlaylist = (timeframe: string, count: number): void => {
        axios.post(`/api/create-playlist/${timeframe}/${count}`)
        // axios.post(`http://127.0.0.1:5000/api/create-playlist/${timeframe}/${count}`)
            .then(res => {
                console.log(res.data);
            })
            .catch(error => {
                console.log(error);
            })
    }

    const handleChange = (e: any, value: string) => {
        setActiveTab(value);
        getTopTracks(value);
    }

    useEffect(() => {
        getTopTracks('short_term');
    }, []);

    return (
        <>
            <NavBar userData={userData} />
            <Container>
                <Container>
                    <h1>Top Tracks</h1>
                </Container>
                <Box className='list-wrapper'>
                    <Paper elevation={8}>
                        <Container>
                            <Box sx={{ 'display': 'flex', 'flex-direction': 'column', 'align-items': 'center', 'gap': '15px' }}>
                                <Tabs value={activeTab} onChange={handleChange}>
                                    <Tab label='Last 4 weeks' value={'short_term'}></Tab>
                                    <Tab label='Last 6 months' value={'medium_term'}></Tab>
                                    <Tab label='All time' value={'long_term'}></Tab>
                                </Tabs>
                                <Button onClick={() => {
                                    createPlaylist(activeTab, 20);
                                    setIsDisabled(isDisabled.concat(activeTab));
                                }}
                                    variant="contained" color="success" disabled={isDisabled.includes(activeTab)}>{isDisabled.includes(activeTab)
                                        ? "Playlist created!"
                                        : "Create playlist"}
                                </Button>
                            </Box>
                        </Container>
                        <List dense>
                            {topTracks.map((el: any, index) => {
                                return <SongItem data={el} index={index} />
                            })}
                        </List>
                    </Paper>
                </Box >
            </Container>

        </>
    )
}