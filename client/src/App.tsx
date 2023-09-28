import React, { useState } from 'react';
import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Top from './pages/Top';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';


const App = () => {
  const [userData, setUserData] = useState();
  const navigate = useNavigate();


  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  const loginHandler = (data: any): void => {
    setUserData(data);
    navigate('/top');
  }

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Routes>
          <Route path='/' element={<Home loginHandler={loginHandler} />}></Route>
          <Route path='/top' element={<Top userData={userData}/>}></Route>
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
