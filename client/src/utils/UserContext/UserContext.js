import {createContext} from 'react';

const UserContext = createContext({
    user: {},
    first: '',
    last: '',
    username: '',
    password: '',
    email: '',
    github: '',
    ideas: [],
    projects: [],
    isLoggedIn: false, 
    handleInputChange: () => {},
    handleRegisterUser: () => {},
    handleSignInUser: () => {},
    handleUserProfile: () => {},
    handleLogOut: () => {}
});

export default UserContext;