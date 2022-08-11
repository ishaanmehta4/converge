import React, { createContext, useState } from 'react';
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
import ProjectSearch from './pages/projectSearch/ProjectSearch';

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

export const GlobalUserContext = createContext({
});

function App() {
  let [globalUserData, setGlobalUserData] = useState({
    username: '',
    firebase_uid: '',
    display_name: '',
    display_picture: '',
    phone_number: '',
    email: '',
    skills: [],
    fcm_device_tokens: [],
  })


  return (
    <GlobalUserContext.Provider value={{ globalUserData, setGlobalUserData }}>
      <ThemeProvider theme={appTheme}>
        <Router>
          <div className="App">
            <div id="app-nav-container">
              <h1><AppBar /></h1>
            </div>

            <div id="app-page-container">
              <Switch>
                <Route exact path="/" component={HomePage} />
                <Route exact path="/dashboard" component={Dashboard} />
                <Route exact path="/complete-signup" component={CompleteSignupPage} />
                <Route exact path="/dashboard" component={Dashboard} />
                <Route exact path="/search-projects" component={ProjectSearch} />
              </Switch>
            </div>
          </div>
        </Router>
      </ThemeProvider>
    </GlobalUserContext.Provider>
  );
}

export default App;
