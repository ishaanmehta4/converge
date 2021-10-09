import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import HomePage from './pages/home/home';
import CompleteSignupPage from './pages/completeSignup/completeSignup';

import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch> 
          <Route exact path="/" component={HomePage}/>
          <Route exact path="/complete-signup" component={CompleteSignupPage}/>

        </Switch>
      </div>
    </Router>
  );
}

export default App;
