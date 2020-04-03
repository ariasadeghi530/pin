import React, {useEffect, useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import UserContext from '../../utils/UserContext';
import PostContext from '../../utils/PostContext';
import Chip from '@material-ui/core/Chip';


import  { Redirect }  from 'react-router-dom';

const myTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#FFB74D'
    },
    secondary: {
      main: '#C25450'
    }
  }
})

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    marginBottom: 0,
    marginTop: 20,
   
  },
  title: {
    fontSize: 14,
    textAlign: "right",
    float: "right",
  },
  ideaName: {
    marginTop: 0,
  },
  diffChip: {
    marginTop: '1rem',
  },
  cardDescp:{
    marginTop: 15,
  },
  cardAction: {
    display: 'block',
    textAlign: 'initial'
  }
});

function HomePageCard() {


  const classes = useStyles();

const {posts, handleViewAll, handleGoToPost} = useContext(PostContext);
const {isLoggedIn, user} = useContext(UserContext);

  useEffect(() =>{
    handleViewAll();
  }, [isLoggedIn])
  return (
    <>
    { isLoggedIn ? 
  posts.map((post,index )=> ( <Container key={index}>
    <Card className={classes.root} key={post.owner._id} variant="outlined">
      <ButtonBase
       className={classes.cardAction}
       onClick={() => handleGoToPost(post._id)}
       >
      <CardContent>
        <Typography className={classes.title} color="textSecondary">
          {post.owner.username}
          </Typography>
        <Typography variant="h4" component="h3" className={classes.ideaName}>
         {post.title}
          <Typography variant="body2" component="p" className={classes.diffChip}>
            <MuiThemeProvider theme={myTheme}>
            <Chip label={post.difficulty} color={ post.difficulty === 'Hard' ? 'secondary' : ( post.difficulty === 'Moderate' ? 'primary' : 'default') } variant="outlined" /> 
            </MuiThemeProvider>
          </Typography>
        </Typography>
        <Typography variant="body2" component="h6" className={classes.cardDescp}>
            
        {post.description}
          
        </Typography>
      </CardContent>
      </ButtonBase>
    </Card>
    </Container>)) : <Redirect to={{pathname: '/signin'}} /> 
    }
  </>
  )
};

export default HomePageCard;