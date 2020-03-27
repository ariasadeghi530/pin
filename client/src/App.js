import React from 'react';
import SignIn from './components/views/SignIn';
import HomePage from './components/views/HomePage';
import SignUp from './components/views/SignUp';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/signin">
          <SignIn />
        </Route>
        <Route exact path="/signup">
          <SignUp />
        </Route>
        <Route exact path="/">
          <HomePage />
        </Route>
      </Switch>
    </Router>
  )
};

export default App;
