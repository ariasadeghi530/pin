import React, {useState} from 'react';
import SignIn from './components/views/SignIn';
import HomePage from './components/views/HomePage';
import SignUp from './components/views/SignUp';
import Reset from './components/views/Reset';
import PrimarySearchAppBar from './components/Navbar'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import UserContext from './utils/UserContext';
import axios from 'axios';

function App() {

  const [userState, setUserState] = useState({
    user: {},
    first: '',
    last: '',
    username: '',
    email: '',
    github: '',
    password: '',
    isLoggedIn: false
  })
  userState.handleInputChange = event => {
    setUserState({...userState, [event.target.name]: event.target.value});
  }

  userState.handleRegisterUser = (event) => {
    event.preventDefault();

     const user =  {
      first: userState.first,
      last: userState.last,
      username: userState.username,
      email: userState.email,
      github: userState.github,
      password: userState.password
      };

      console.log(user, userState.password);
      axios.post('/api/users/register', user)
      .then((registered) => {
        axios.post('/api/users/login', {username: user.username, password: user.password})
        .then((response) => {
          console.log(response);
          setUserState({...userState, 
            user: {
              first: user.first,
              last: user.last,
              username: user.username,
              email: user.email,
              github: user.github
            }, 
             first: '',
             last: '',
             username: '',
             email: '',
             github: '',
             password: ''})
      })
      .catch(e => console.error(e))
        })

      .catch(e => console.error(e));
  }

  userState.handleSignInUser = (event) => {
    event.preventDefault();
    const user = {username: userState.username, password: userState.password};

  axios.post('api/users/login', {user})
  .then(({data}) => {
    setUserState({...userState, user: {username: user.username}, username: '', password: '', isLoggedIn: data.isLoggedIn})

  })
  .catch(e => console.error(e))

  }

  return (
    <UserContext.Provider value={userState}>
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
      </Switch>
    </Router>
    </UserContext.Provider>
  )
};


export default App;
