import React, {useState, useEffect} from 'react';
import SignIn from './components/views/SignIn';
import HomePage from './components/views/HomePage';
import SignUp from './components/views/SignUp';
import Reset from './components/views/Reset';
import PrimarySearchAppBar from './components/Navbar'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import UserContext from './utils/UserContext';
import PostContext from './utils/PostContext';
import User from './utils/User'
import Post from './utils/Post';

function App() {

  const [userState, setUserState] = useState({
    user: {},
    first: '',
    last: '',
    username: '',
    email: '',
    github: '',
    password: ''
  });

  const [postState, setPostState] = useState({
    posts: [],
    post: {},
    title: '',
    description: '',
    difficulty: '',
    totalTime: '',
    imageLinks: ''
  });

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

      User.register(user)
      .then((registered) => {
        User.login({username: user.username, password: user.password})
        .then(({data}) => {
          localStorage.setItem('jwt', data.token);
          setUserState({...userState, 
            user: data, 
             first: '',
             last: '',
             username: '',
             email: '',
             github: '',
             password: '',
            isLoggedIn: data.isLoggedIn})
      })
      .catch(e => console.error(e))
        })
      .catch(e => console.error(e));
  }

  userState.handleSignInUser = (event) => {
    event.preventDefault();
    const user = {username: userState.username, password: userState.password};

  User.login(user)
  .then(({data}) => {
    localStorage.setItem('jwt', data.token);
    console.log(data);
    setUserState({...userState, user: data, username: '', password: '', isLoggedIn: data.isLoggedIn})

  })
  .catch(e => console.error(e))

  }

  postState.handleViewAll = () =>{
    Post.home()
    .then(({data}) => {
     
      setPostState({...postState, posts: data})
    })
    .catch(e => console.error(e))
  }

  return (
    <>
    <PostContext.Provider value={postState}>
    <UserContext.Provider value={userState}>
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
    </UserContext.Provider>
    </PostContext.Provider>
    </>
  )
};


export default App;
