import React, {useEffect, useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import UserContext from '../../utils/UserContext';
import PostContext from '../../utils/PostContext';
import  { Redirect }  from 'react-router-dom';

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
  }
});

function HomePageCard() {

  const classes = useStyles();

const {posts, handleViewAll} = useContext(PostContext);
const {isLoggedIn, user} = useContext(UserContext);

useEffect(() =>{
  handleViewAll();
}, [isLoggedIn])
  return (
    <>
    { isLoggedIn ? 
  posts.map((post,index )=> ( <Container key={index}>
    <Card className={classes.root} key={post.owner._id} variant="outlined">
      <CardContent>
        <Typography className={classes.title} color="textSecondary">
          {post.owner.username}
          </Typography>
        <Typography variant="h4" component="h3" className={classes.ideaName}>
         {post.title}
          <Typography variant="body2" component="p">
            <br/>
            Difficulty: {post.difficulty}
          </Typography>
        </Typography>
        <Typography variant="body2" component="p">
        {post.description}
          <br />
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">View Idea</Button>
      </CardActions>
    </Card>
    </Container>)) : <Redirect to={{pathname: '/signin'}} /> 
    }
  </>
  )
};

export default HomePageCard;