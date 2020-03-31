import React, {useContext} from 'react';
import clsx from 'clsx';
import {  fade, makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import UserContext from '../../utils/UserContext';
import PostContext from '../../utils/PostContext';
import Link from '@material-ui/core/Link';
import CloseIcon from '@material-ui/icons/Close';

const drawerWidth = '100%';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  },
  title: {
    flexGrow: 1,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
  
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 25,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    height: "7%",
    width: "7%",
    marginBottom: 7,
  },
  text: {
    color: "white",
  },
  listText: {
    color: "black"
  },
}));

export default function PersistentDrawerRight() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const {handleLogOut} = useContext(UserContext);
  const {handleSearch, handleInputChange, search} = useContext(PostContext);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar >
          <Typography variant="h6" noWrap className={classes.title} >
          <Link href="/" >
            <div className={classes.text}>
            <img src="https://image.flaticon.com/icons/svg/212/212816.svg" className={classes.logo}/> 
            Pin 
            </div>
            </Link>
          </Typography>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerOpen}
            className={clsx(open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="top"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <CloseIcon /> : <CloseIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem>
            
          <SearchIcon />
          <div className={classes.search}>
            <form onSubmit={(e) => {handleSearch(e); handleDrawerClose()}} noValidate> 
            <InputBase
            name="search"
            value={search}
              placeholder="Search for an idea..."
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              onChange={handleInputChange}
    
            />
            {/* <Button onClick={handleSearch}></Button> */}
            </form>
          </div>
          </ListItem>
          {['Profile', 'New Idea'].map((text, index) => (
            <Link href={index % 2 === 0 ? "/profile": "/postidea"} className={classes.listText}>
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <AccountCircleOutlinedIcon /> : <CreateOutlinedIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
            </Link>
          ))}
            <ListItem>
            <Button variant="outlined" color="secondary" onClick={handleLogOut} >
            Logout
          </Button>
            </ListItem>
        </List>
        <Divider />
        
      </Drawer>
    </div>
  );
}