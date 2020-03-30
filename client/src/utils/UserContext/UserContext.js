import {createContext} from 'react';

const UserContext = createContext({
    user: {},
    first: '',
    last: '',
    username: '',
    password: '',
    email: '',
    github: '',
    isLoggedIn: false, 
    handleInputChange: () => {},
    handleRegisterUser: () => {},
    handleSignInUser: () => {},
    handleLogOut: () => {}
});

export default UserContext;