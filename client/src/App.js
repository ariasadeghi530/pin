import React, { Component } from 'react';
import Navbar from './components/Navbar'
import SignIn from './components/views/SignIn';
import HomePage from './components/views/HomePage';
import SignUp from './components/views/SignUp';
import Reset from './components/views/Reset';
import PrimarySearchAppBar from './components/Navbar'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
// import validators from './common/validators';
// import Routes from './Routes';

// const browserHistory = createBrowserHistory();

// export default class App extends Component {
//   render() {
//     return (
//       <ThemeProvider theme={theme}>
//         <Router history={browserHistory}>
//           <Routes />
//         </Router>
//       </ThemeProvider>
//     );
//   }
// }


function App() {
  return (
    <>
    <Navbar />
    <Router>
      <Switch>
        <Route exact path="/signin">
          <SignIn />
        </Route>
        <Route exact path="/signup">
          <SignUp />
        </Route>
        <Route exact path="/">
        <PrimarySearchAppBar />
          <HomePage />
        </Route>
        <Route exact path="/reset">
          <Reset />
        </Route>
      </Switch>
    </Router>
    </>
  )
};


export default App;
