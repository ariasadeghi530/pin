import React, { useState } from 'react';
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
    bio: '',
    ideas: [],
    projects: [],
    edit: false,
    isLoggedIn: localStorage.getItem('loggedIn') || false,
    message: '',
    rememberMe: true
  });

  const [postState, setPostState] = useState({
    posts: [],
    post: {},
    postOwner: '',
    posterId: '',
    title: '',
    description: '',
    difficulty: '',
    totalTime: '',
    imageLinks: '',
    search: '',
    newSolution: {},
    solutions: [],
    comments: [],
    desc: '',
    gh: '',
    deployed: '',
    newComment: '',
    edit: false,
    addSol: false,
  });

  userState.handleToggleRemember = () => {
    setUserState({ ...userState, rememberMe: !userState.rememberMe })
  }

  userState.handleInputChange = event => {
    setUserState({ ...userState, [event.target.name]: event.target.value });
  }

  userState.handleRegisterUser = (event) => {
    event.preventDefault();

    const user = {
      first: userState.first,
      last: userState.last,
      username: userState.username,
      email: userState.email,
      github: userState.github,
      password: userState.password
    };

    User.register(user)
      .then((registered) => {
        if (registered.data === 'OK') {
        User.login({ username: user.username, password: user.password })
          .then(({ data }) => {
            if(data.isLoggedIn){
            localStorage.setItem('jwt', data.token);
            localStorage.setItem('loggedIn', data.isLoggedIn);
            localStorage.setItem('uid', data.id);
            setUserState({
              ...userState,
              user: data,
              first: '',
              last: '',
              username: '',
              email: '',
              github: '',
              password: '',
              isLoggedIn: data.isLoggedIn,
              message: ''
            });
            axios.get(`https://api.github.com/search/users?q=${data.github}`)
              .then(({ data: { items } }) => {
                localStorage.setItem('avatar', items[0].avatar_url)
              })
              .catch(e => console.error(e));
            }
          })
          .catch(e => console.error(e))
        } else if (registered.data.message !== undefined) {
          setUserState({ ...userState, message: registered.data.message })
        } else {
          if (registered.data.keyValue.email) {
            let message = `A user with email ${registered.data.keyValue.email} already exists.`
            setUserState({ ...userState, message })
          } else {
            let message = `A user with GitHub account ${registered.data.keyValue.github} already exists.`
            setUserState({ ...userState, message })
          }
        }
      })
      .catch(err => console.error(err));
  }

  userState.handleSignInUser = (event) => {
    event.preventDefault();
    const user = { username: userState.username, password: userState.password };
    if(user.username !== '' && user.password !== ''){
      User.login(user)
        .then(({ data }) => {
          if(data.isLoggedIn){
            localStorage.setItem('jwt', data.token);
            localStorage.setItem('loggedIn', data.isLoggedIn);
            localStorage.setItem('uid', data.id);
            setUserState({ ...userState, message: '', user: data, username: '', password: '', isLoggedIn: data.isLoggedIn });
            axios.get(`https://api.github.com/search/users?q=${data.github}`)
              .then(({ data: { items } }) => {
                localStorage.setItem('avatar', items[0].avatar_url)
              })
              .catch(e => console.error(e));
    
          } else {
            setUserState({ ...userState, message: 'Login failed, incorrect username or password'})
          }
        })
        .catch(e => console.error(e))
    }

  }

  userState.handleUserProfile = () => {
    User.profile()
      .then(({ data: userInfo }) => {
        setUserState({ ...userState, user: userInfo, projects: userInfo.projects, ideas: userInfo.ideas });
      })
      .catch(e => console.error(e));
  }

  userState.handlePin = (id) => {
    User.pin(id)
      .then(({ data: userInfo }) => {
        setUserState({ ...userState, user: userInfo, projects: userInfo.projects, ideas: userInfo.ideas });
      })
      .catch(e => console.error(e));
  }
  userState.handleUnPin = (id) => {
    User.unpin(id)
      .then(({ data: userInfo }) => {
        setUserState({ ...userState, user: userInfo, projects: userInfo.projects, ideas: userInfo.ideas });
      })
      .catch(e => console.error(e));
  }

  userState.handleToggleEdit = () => {
    setUserState({...userState, edit: !userState.edit});
  }

  userState.handleEditProfile = (event, id, profile) => {
    event.preventDefault();
    let updates = {username: userState.username, first: userState.first, last: userState.last, email: userState.email, github: userState.github, bio: userState.bio};
  
    if(updates.username === ''){
      updates.username = profile.username;
    }
    if(updates.github === ''){
      updates.github = profile.github;
    }
    if(updates.first === ''){
      updates.first = profile.first;
    }
    if(updates.last === ''){
      updates.last = profile.last;
    }
    if(updates.email === ''){
      updates.email = profile.email;
    }
    if(updates.bio === ''){
      updates.bio = profile.bio;
    }
    User.update(updates)
    .then(({data}) => {
      if(data.errmsg){
        if (data.keyValue.email) {
          let message = `A user with email ${data.keyValue.email} already exists.`;
          setUserState({ ...userState, message });
        } 
        else if(data.keyValue.username){
          let message = `A user with username ${data.keyValue.username} already exists.`;
          setUserState({ ...userState, message });
        }
        else {
          let message = `A user with GitHub account ${data.keyValue.github} already exists.`;
          setUserState({ ...userState, message });
        }
      } else {
        if(updates.github !== profile.github){
          localStorage.removeItem('avatar');
          axios.get(`https://api.github.com/search/users?q=${updates.github}`)
          .then(({ data: { items } }) => {
            localStorage.setItem('avatar', items[0].avatar_url);
          })
          .catch(e => console.error(e));
        }
        setUserState({...userState, user: data, projects: data.projects, ideas: data.ideas, edit: !userState.edit, first: '', username: '', last: '', email: '', github: '', bio: '', message: ''});
      }
     
    })
    .catch(e => console.error(e));
  }

  userState.handleLogOut = () => {
    localStorage.clear();
    setUserState({ ...userState, isLoggedIn: false });
  }

  postState.handleInputChange = event => {
    setPostState({ ...postState, [event.target.name]: event.target.value });
  }

  postState.handleViewAll = () => {
    Post.home()
      .then(({ data }) => {
        setPostState({ ...postState, posts: data })
      })
      .catch(e => console.error(e))
  }
  postState.handleSearch = (event) => {
    event.preventDefault();

    Post.search(postState.search)
      .then(({ data }) => {

        setPostState({ ...postState, posts: data, search: '' });
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
      .then(({ data }) => {

        setPostState({ ...postState, title: '', description: '', difficulty: '', totalTime: '', imageLinks: '', post: data });
        window.location.href = '/profile/' + data.owner;
      })
      .catch(e => console.error(e))
  };

  postState.handleGoToPost = (id) => {
    window.location.href = '/idea/' + id;
  }
  postState.handleViewPost = (id) => {
    Post.idea(id)
      .then(({ data }) => {
        setPostState({ ...postState, post: data, postOwner: data.owner.username, solutions: data.solutions, comments: data.comments, posterId: data.owner._id });
      })
      .catch(e => console.error(e));
    User.profile()
      .then(({ data }) => {
        let pinIds = data.projects.map(proj => proj._id);
        setUserState({ ...userState, projects: pinIds });
      })
      .catch(e => console.error(e))
  }


  postState.handleToggleSolution = () => {
    setPostState({ ...postState, addSol: !postState.addSol });
  }

  postState.handleAddSolution = (event, id) => {
    event.preventDefault();
    if (postState.desc !== '' && postState.gh !== '') {
      let solution = { description: postState.desc, github: postState.gh, deployed: postState.deployed };
      Post.addSolution(id, solution)
        .then(({ data }) => {
          setPostState({ ...postState, post: data, postOwner: data.owner.username, solutions: data.solutions, comments: data.comments, addSol: false, desc: '', gh: '', deployed: '' });
        })
        .catch(e => console.error(e))
    } else {
      setPostState({ ...postState, addSol: !postState.addSol });
    }
  }

  postState.handleRemSolution = (id, solution) => {
    Post.remSolution(id, solution)
      .then(({ data }) => {
        setPostState({ ...postState, post: data, postOwner: data.owner.username, solutions: data.solutions, comments: data.comments, addSol: false });
      })
      .catch(e => console.error(e))
  }

  postState.handleDeleteIdea = (id) => {
    Post.delete(id)
      .then(({ data }) => {
        console.log(data);
        window.location.href = '/profile/' + data._id;
      })
      .catch(e => console.error(e))
  }

  postState.handleToggleEdit = () => {
    setPostState({ ...postState, edit: !postState.edit })
  }

  postState.handleEditIdea = (event, id, post) => {
    event.preventDefault();
    let updates = { title: postState.title, description: postState.description, difficulty: postState.difficulty, totalTime: postState.totalTime };
 
    if (updates.title === '') {
      updates.title = post.title;
    }
    if (updates.description === '') {
      updates.description = post.description;
    }
    if (updates.difficulty === '') {
      updates.difficulty = post.difficulty;
    }
    if (updates.totalTime === '') {
      updates.totalTime = post.totalTime;
    }
    Post.update(id,updates)
    .then(({data}) => {
      
      setPostState({ ...postState, post: data, postOwner: data.owner.username, solutions: data.solutions, comments: data.comments, posterId: data.owner, edit: false });
    })
    .catch(e => console.error(e))
  }

  postState.handleAddComment = (event, id) =>{
    event.preventDefault();
    let comment = {comment: postState.newComment}
    if(comment.comment !== ''){
      Post.addComment(id, comment)
      .then(({data}) => {
        setPostState({...postState, post: data, postOwner: data.owner.username, solutions: data.solutions, comments: data.comments, posterId: data.owner, newComment: '' });
      })
      .catch(e => console.error(e));
    }
  }

  postState.handleRemComment = (id, comment) =>{
    Post.remComment(id, comment)
    .then(({data}) => {
      setPostState({...postState, post: data, postOwner: data.owner.username, solutions: data.solutions, comments: data.comments, posterId: data.owner, newComment: '' });
    })
    .catch(e => console.error(e));
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
