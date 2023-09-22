import React from 'react'
import { AppBar } from '@mui/material';
import TopProps from '../../pages/Top/Top.types'

export const NavBar: React.FC<TopProps> = ({ userData }: TopProps) => {
    return (
        <>
            <AppBar position='static'>Playlist Premier</AppBar>
        </>
    )
}
