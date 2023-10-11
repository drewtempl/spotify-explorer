import React, { useEffect, useState } from "react";
import "./App.css";
import { Routes, Route, useNavigate, Outlet } from "react-router-dom";
import Home from "./pages/Home";
import Top from "./pages/Top";
import { ThemeProvider, createTheme, responsiveFontSizes } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Genre from "./pages/Genre";
import NavBar from "./components/NavBar";
import Prompt from "./pages/Prompt";

const App = () => {
  const [userData, setUserData] = useState<any>();
  const navigate = useNavigate();

  let darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });
  darkTheme = responsiveFontSizes(darkTheme);

  const loginHandler = (data: any): void => {
    sessionStorage.setItem("userData", JSON.stringify(data));
    setUserData(data);
    navigate("/top");
  };

  useEffect(() => {
    const data = sessionStorage.getItem('userData');

    if (data) {
      setUserData(JSON.parse(data));
    }
  }, []);

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Routes>
          <Route
            path="/"
            element={<Home loginHandler={loginHandler} />}
          />
          <Route element={<><NavBar userData={userData} /><Outlet /></>}>
            <Route path="/top" element={<Top userData={userData} />}></Route>
            <Route path="/genre" element={<Genre userData={userData} />}></Route>
            <Route path="/prompt" element={<Prompt />}></Route>
          </Route>
        </Routes>
      </ThemeProvider >
    </>
  );
};

export default App;
