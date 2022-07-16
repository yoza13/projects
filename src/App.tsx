import {
  createTheme,
  ThemeProvider,
  PaletteMode,
  CssBaseline,
} from "@mui/material";
import * as React from "react";
import { NavigationBar } from "./components/NavigationBar";
import { Footer } from "./components/Footer";
import { ErrorFallback } from "./components/ErrorFallback";
import { WeatherSearch } from "./components/WeatherApp/WeatherSearch";
import { Calculator } from "calculator-typescript";
import { Minesweeper } from "mui-minesweeper";
import { Home } from "./components/Home";
import { ToDoApp } from "./components/ToDo/ToDoApp";
import { PhotoSearch } from "./components/Pexels/PhotoSearch";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";

export const App = () => {
  const light = {
    palette: {
      mode: "light" as PaletteMode,
    },
  };
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <ThemeProvider theme={createTheme(light)}>
        <CssBaseline />
        <Router>
          <NavigationBar />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/weather-app" element={<WeatherSearch />}></Route>
            <Route path="/calculator" element={<Calculator />}></Route>
            <Route path="/todo" element={<ToDoApp />}></Route>
            <Route path="/mine-sweeper" element={<Minesweeper />}></Route>
            <Route path="/photo-search" element={<PhotoSearch />}></Route>
          </Routes>
          <Footer />
        </Router>
      </ThemeProvider>
    </ErrorBoundary>
  );
};
