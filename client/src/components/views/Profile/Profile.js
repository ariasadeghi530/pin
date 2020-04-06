import React, { useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Navbar from '../../Navbar';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import UserContext from '../../../utils/UserContext';
import Link from "@material-ui/core/Link";
import  { Redirect }  from 'react-router-dom';
import Container from '@material-ui/core/Container';
import ButtonBase from '@material-ui/core/ButtonBase';
import Chip from '@material-ui/core/Chip'
import PostContext from '../../../utils/PostContext';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';

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

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    paddingBottom: '0px',
    paddingTop: '0px'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '70%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  title: {
    fontSize: 24,
    display: 'flex',
    justifyContent: 'center',
    marginTop: '1%',
    marginBottom: 0
  },
  pos: {
    display: 'block',
    marginTop: '1%',
  },
  pageMargin: {
    marginTop: "20%",
    //   float: 'right'
  },
  avatar: {
    marginBottom: 0,
  },
  avatarImg: {
    width: "20%",
    height: "20%",
    borderRadius: 40,
    overflowX: "hidden"
  },
  elementMargin: {
    marginTop: "4%"
  },
  floatRight: {
    // float: 'right',

    marginTop: '2%',
    display: "inline"
  },
  floatLeft: {
    // float: "left"
    display: 'inline'
  },
  noMargin: {
    margin: 0,
  },
  imageSize: {
    height: "32px",
    width: "32px"
  },
  fullWidth: {
    width: '100%'
  },
  removePadding:{
    paddingTop: 0,
    paddingBottom: 0,
    width: "100%"
  },
  content:{
    display: 'inline'
  },
  right:{
    float: 'right'
  },
  left:{
    float: 'left'
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
  },
  cardTitle:{
    fontSize: 14,
    textAlign: "right",
    float: "right",
  },
  cardRoot:{
    minWidth: 275,
    marginBottom: 0,
    marginTop: 20,
  },
  expansionHeight:{
    overflowX: "hidden",
    display: 'block',
    paddingTop: 0,
  }
}));



export default function ControlledExpansionPanels() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const { isLoggedIn, user, handleUserProfile, projects, ideas, edit, handleInputChange, handleToggleEdit, handleEditProfile, first, last, username, github, bio, email } = useContext(UserContext);
const {handleGoToPost} = useContext(PostContext);
  const avatarURL = localStorage.getItem('avatar');

 
  useEffect(() => {
    handleUserProfile();
  }, [isLoggedIn]);
 
 
  return (
    <>
{isLoggedIn ? 

     (
       <>
        <Navbar />
      {  edit ? 
      <>
      <Card className={classes.root, classes.pageMargin}>
      <CardContent>
       <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                size="small"
                
                fullWidth
                id="username"
                label="Username"
                name="username"
                defaultValue={user.username}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                size="small"
                name="first"
                defaultValue={user.first}
                variant="outlined"
                
                fullWidth
                id="firstName"
                label="First Name"
               
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                size="small"
                
                fullWidth
                id="lastName"
                label="Last Name"
                name="last"
                autoComplete="lname"
                defaultValue={user.last}
                onChange={handleInputChange}
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                multiline={true}
                rows={5}
                fullWidth
                id="bio"
                label="Bio"
                name="bio"
                
                defaultValue={user.bio}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                size="small"
                
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                defaultValue={user.email}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                size="small"
                fullWidth
                id="github"
                label="GitHub username"
                name="github"
                defaultValue={user.github}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
        </form>
        </CardContent>
          <CardActions>
            {localStorage.getItem('uid') === user._id ? <Button onClick={(e)=>handleEditProfile(e, user._id, user)}size="small" color="primary" variant='outlined' className={classes.noMargin, classes.fullWidth}>Save</Button> : <div> </div>}
          </CardActions>
          </Card>
      </>
      
      :
      <div className={classes.pageMargin}>
        <Card className={classes.root}>
          <Typography className={classes.title} color="textPrimary" gutterBottom>
            {user.username}
          </Typography>
          <CardHeader
            className={classes.removePadding}
           
            avatar={ avatarURL ? <Avatar src={avatarURL} alt="gh-avatar" className={classes.avatarImg} /> : <Avatar aria-label="recipe"  className={classes.avatar}>
                {user.username}
              </Avatar>
              }
          />
    
          <CardContent
          className={classes.removePadding}
          >
            <div>

              <div>
                <Typography className={classes.pos} color="textPrimary">
                  {user.first} {user.last}
                </Typography>
              </div>
              <Typography variant="body2" component="p" className={classes.pos}>
                {user.bio} 
              </Typography>
              <Typography className={classes.pos} color="textPrimary">

                <Link href={`https://github.com/${user.github}`} target="_blank" className={classes.imageSize}>
                  <div >
                    <img src={"/images/products/product_5.png"} alt="github-logo" className={classes.imageSize} />

                  </div>
                </Link>
              </Typography>
            </div>
          </CardContent>
          <CardActions>
            {localStorage.getItem('uid') === user._id ? <Button onClick={handleToggleEdit}size="small" color="primary" variant='outlined' className={classes.noMargin, classes.fullWidth}>Edit</Button> : <div> </div>}
          </CardActions>
        </Card>
      </div>
      }

      <div className={classes.root, classes.elementMargin}>
        <ExpansionPanel expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography className={classes.heading}>{user.username + "'s Ideas"}</Typography>
            {/* <Typography className={classes.secondaryHeading}>{user.username}'s Ideas</Typography> */}
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.expansionHeight}>
          { ideas.length === 0 ? <Typography>
              No ideas posted! Add an idea to see it here!
          </Typography> : 
          <>
        {
         ideas.map((idea) => (
           <Container> 
           <Card className={classes.cardRoot} key={idea.owner._id} variant="outlined">
           <ButtonBase
            className={classes.cardAction}
            onClick={() => handleGoToPost(idea._id)}
            >
           <CardContent>
             <Typography className={classes.cardTitle} color="textSecondary">
               {idea.owner.username}
               </Typography>
             <Typography variant="h4" component="h3" className={classes.ideaName}>
              {idea.title}
               <Typography variant="body2" component="p" className={classes.diffChip}>
                 
               <MuiThemeProvider theme={myTheme}>
            <Chip label={idea.difficulty} color={ idea.difficulty === 'Hard' ? 'secondary' : ( idea.difficulty === 'Moderate' ? 'primary' : 'default') } variant="outlined" /> 
            </MuiThemeProvider>
               </Typography>
             </Typography>
             <Typography variant="body2" component="h6" className={classes.cardDescp}>
                 
             {idea.description}
               
             </Typography>
           </CardContent>
           </ButtonBase>
         </Card>
         </Container>))
        }
        </>
        }
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2bh-content"
            id="panel2bh-header"
          >
            <Typography className={classes.heading}>{user.username + "'s Pinned Projects"}</Typography>
            {/* <Typography className={classes.secondaryHeading}>
            Review all your posts 
          </Typography> */}
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.expansionHeight}>
          { projects.length === 0 ? <Typography>
              No ideas pinned! Explore ideas and pin them to see them here!
          </Typography> :
          <>
          {
         projects.map((idea) => (
           <Container> 
           <Card className={classes.cardRoot} key={idea.owner._id} variant="outlined">
           <ButtonBase
            className={classes.cardAction}
            onClick={() => handleGoToPost(idea._id)}
            >
           <CardContent>
             <Typography className={classes.cardTitle} color="textSecondary">
               {idea.owner.username}
               </Typography>
             <Typography variant="h4" component="h3" className={classes.ideaName}>
              {idea.title}
               <Typography variant="body2" component="p" className={classes.diffChip}>
               <MuiThemeProvider theme={myTheme}>
            <Chip label={idea.difficulty} color={ idea.difficulty === 'Hard' ? 'secondary' : ( idea.difficulty === 'Moderate' ? 'primary' : 'default') } variant="outlined" /> 
            </MuiThemeProvider>
               </Typography>
             </Typography>
             <Typography variant="body2" component="h6" className={classes.cardDescp}>
                 
             {idea.description}
               
             </Typography>
           </CardContent>
           </ButtonBase>
         </Card>
         </Container>))
        }
        </>}
          </ExpansionPanelDetails>
        </ExpansionPanel>
        {/* <ExpansionPanel expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography className={classes.heading}>Solutions</Typography>
          <Typography className={classes.secondaryHeading}>
            Click here to see your solutions.
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas eros,
            vitae egestas augue. Duis vel est augue.
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Typography className={classes.heading}>Comments</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            Insert comment table here
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel> */}
      </div>
      </> ) :  <Redirect to={{pathname: '/signin'}} />}
    </>
  );
}

