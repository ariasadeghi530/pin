import {createContext} from 'react';

const UserContext = createContext({
    user: {},
    first: '',
    last: '',
    username: '',
    password: '',
    email: '',
    github: '',
    bio: '',
    ideas: [],
    projects: [],
    isLoggedIn: false, 
    edit: false,
    handleInputChange: () => {},
    handleRegisterUser: () => {},
    handleSignInUser: () => {},
    handleUserProfile: () => {},
    handleLogOut: () => {},
    handleToggleEdit: () => {},
    handleEditProfile: () => {},
    handlePin: () => {},
    handleUnPin: () => {},
    handleEditProfile: () => {},
});

export default UserContext;