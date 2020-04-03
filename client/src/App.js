import React, {useState, useEffect} from 'react';
import SignIn from './components/views/SignIn';
import HomePage from './components/views/HomePage';
import SignUp from './components/views/SignUp';
import Reset from './components/views/Reset';
import PasswordReset from './components/views/ResetPassword';
import CreateIdea from './components/views/CreateIdea'
import PrimarySearchAppBar from './components/Navbar'
import Idea from './components/Idea'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import UserContext from './utils/UserContext';
import PostContext from './utils/PostContext';
import User from './utils/User'
import Post from './utils/Post';
import Profile from './components/views/Profile';
import axios from 'axios';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#FFB74D'
    },
    secondary: {
      main: '#FFB76E'
    },
    easy: {
      main: '#00B069'
    },
    hard: {
      main: '#C25450'
    }
  }
})

function App() {

  const [userState, setUserState] = useState({
    user: {},
    first: '',
    last: '',
    username: '',
    email: '',
    github: '',
    password: '',
    ideas: [],
    projects: [],
    isLoggedIn: localStorage.getItem('loggedIn') || false
  });

  const [postState, setPostState] = useState({
    posts: [],
    post: {},
    postOwner: '',
    title: '',
    description: '',
    difficulty: '',
    totalTime: '',
    imageLinks: '',
    search: '',
    solutions: [],
    comments: []
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
          localStorage.setItem('loggedIn', data.isLoggedIn);
          localStorage.setItem('uid', data.id);
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
    localStorage.setItem('loggedIn', data.isLoggedIn);
    localStorage.setItem('uid', data.id);
    setUserState({...userState, user: data, username: '', password: '', isLoggedIn: data.isLoggedIn})

  })
  .catch(e => console.error(e))

  }

  userState.handleUserProfile =() =>{
    User.profile()
    .then(({data: userInfo}) =>{
      axios.get(`https://api.github.com/search/users?q=${userInfo.github}`)
      .then(({data: {items}}) =>{
        localStorage.setItem('avatar', items[0].avatar_url)
        setUserState({...userState, user: userInfo, projects: userInfo.projects, ideas: userInfo.ideas});
      })
      .catch(e =>console.error(e))
    })
    .catch(e => console.error(e))
  }

  userState.handleLogOut = () => {
    localStorage.clear();
    setUserState({...userState, isLoggedIn: false});
  }

  postState.handleInputChange = event => {
    setPostState({...postState, [event.target.name]: event.target.value});
  }

  postState.handleViewAll = () =>{
    Post.home()
    .then(({data}) => {
    
      setPostState({...postState, posts: data})
    })
    .catch(e => console.error(e))
  }
  postState.handleSearch = (event) => {
    event.preventDefault();
  
    Post.search(postState.search)
    .then(({data}) =>{
     
      setPostState({...postState, posts: data, search: ''});
    })
    .catch(e => console.error(e))
  }

  postState.handleCreateNewPost = event => {
    event.preventDefault();
    let post = { 
      title: postState.title,
      description: postState.description,
      difficulty: postState.difficulty,
      totalTime: postState.totalTime,
      imageLinks: []
    };
    Post.create(post)
      .then(({data}) => {
        
        setPostState({ ...postState, title: '', description: '', difficulty: '', totalTime: '', imageLinks: '', post: data });
        window.location.href = '/profile/' + data.owner;
      })
      .catch(e => console.error(e))
  };

  postState.handleGoToPost = (id) => {
      window.location.href = '/idea/' + id;
  }
  postState.handleViewPost = (id) =>{
    Post.idea(id)
    .then(( {data}) => {
      setPostState({...postState, post: data, postOwner: data.owner.username, solutions: data.solutions, comments: data.comments});
    })
    .catch(e => console.error(e))
  }

 

  return (
    <MuiThemeProvider theme={theme}>
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
        <Route path="/profile/:id" component={Profile}>
        </Route>
        <Route path="/idea/:id" component={Idea}>
          </Route>
        <Route exact path="/reset">
          <Reset />
        </Route>
        <Route exact path="/postidea">
          <PrimarySearchAppBar />
          <CreateIdea />
        </Route>
        <Route path="/resetPassword/:token" component={PasswordReset}>
        </Route>
        <Route exact path="/">
          <PrimarySearchAppBar />
          <HomePage />
        </Route>
      </Switch>
    </Router>
    </UserContext.Provider>
    </PostContext.Provider>
    </MuiThemeProvider>
  
  )
};


export default App;
