import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import './App.css';

import AppBar from './components/appBar/AppBar';
import HomePage from './pages/home/Home';
import CompleteSignupPage from './pages/completeSignup/CompleteSignup';
import Dashboard from './pages/dashboard/Dashboard';

const appTheme = createTheme({
  palette: {
    primary: {
      light: '#0068d6',
      main: '#0068d6',
      dark: '#0068d6',
      contrastText: '#fff',
    },
    secondary: {
      light: '#0068d6',
      main: '#0068d6',
      dark: '#0068d6',
      contrastText: '#000',
    },
    // primary: {
    //   light: '#007bff',
    //   main: '#007bff',
    //   dark: '#007bff',
    //   contrastText: '#fff',
    // },
    // secondary: {
    //   light: '#007bff',
    //   main: '#007bff',
    //   dark: '#007bff',
    //   contrastText: '#000',
    // },
  },
});


function App() {

  return (
    <ThemeProvider theme={appTheme}>
    <Router>
      <div className="App">
      <div id="app-nav-container">
        <h1><AppBar /></h1>
        </div>

        <div id="app-page-container">
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/complete-signup" component={CompleteSignupPage} />
            <Route exact path="/dashboard" component={Dashboard} />
          </Switch>
        </div>
      </div>
    </Router>
    </ThemeProvider>
  );
}

export default App;
