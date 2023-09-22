import React, { useState } from 'react';
import { AppBar, Button } from '@mui/material';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import HomeProps from './Home.types';




export const Home: React.FC<HomeProps> = ({ loginHandler }: HomeProps) => {
    const [userData, setUserData] = useState();
    const navigate = useNavigate();


    const getLogin = (): void => {
        axios.get('http://127.0.0.1:5000/api/user')
            .then(res => {
                // console.log(res.data);
                loginHandler(res.data);

                // navigate('/top')
                // setUserData(data);
            })
            .catch(error => {
                console.log(error);
            })


        // fetch('http://127.0.0.1:5000/api/user')
        //     .then(res => res.json())
        //     .then(data => {
        //         console.log(data);
        //         navigate('/top')
        //         // setUserData(data);
        //     })
    }
    return (
        <>
            <Button onClick={() => getLogin()}>Log in with Spotify</Button>
        </>
    )
}