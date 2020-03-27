import React from 'react';
import SignIn from './components/views/SignIn';
import HomePage from './components/views/HomePage';
import SignUp from './components/views/SignUp';
import Reset from './components/views/Reset';
import PrimarySearchAppBar from './components/Navbar'
import Idea from './components/Idea'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/signin">
          <SignIn />
        </Route>
        <Route exact path="/signup">
          <PrimarySearchAppBar />
          <SignUp />
        </Route>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route exact path="/reset">
          <Reset />
        </Route>
        <Route exact path="/idea">
          <Idea />
        </Route>
      </Switch>
    </Router>
  )
};


export default App;
