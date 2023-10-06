import React, { SetStateAction, useState } from 'react';
import { AppBar, Button } from '@mui/material';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import HomeProps from './Home.types';




export const Home: React.FC<HomeProps> = ({ loginHandler }: HomeProps) => {
    const [userData, setUserData] = useState();
    const [childWindow, setChildWindow] = useState<Window | null>(null);
    const navigate = useNavigate();


    const getLogin = (): void => {
        axios.get('/api/user')
        // axios.get('http://127.0.0.1:5000/api/user')
            .then(res => {
                // console.log(res.data);
                loginHandler(res.data);
                navigate('/top')
            })
            .catch(error => {
                console.log(error);
            })
    }

    const getLoginUrl = (): void => {
        axios.get('/api/login')
        // axios.get('http://127.0.0.1:5000/api/login')
            .then(res => {
                // console.log(res.data);
                openLoginWindow(res.data);
            })
            .catch(error => {
                console.log(error);
            })
    }

    const openLoginWindow = (url: string) => {
        const checkChild = () => {
            if (child?.closed) {
                clearInterval(timer)
                getLogin()
            }
        }

        const child = window.open(url, '', 'popup');
        const timer = setInterval(checkChild, 500);
    }

    return (
        <>
            <Button onClick={() => getLoginUrl()}>Log in with Spotify</Button>
        </>
    )
}