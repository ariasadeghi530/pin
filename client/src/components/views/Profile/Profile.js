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
  }
}));



export default function ControlledExpansionPanels() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const { isLoggedIn, user, handleUserProfile } = useContext(UserContext);

  const avatarURL = localStorage.getItem('avatar');
  let url = window.location.pathname;
  
  useEffect(() => {
    handleUserProfile();
  }, [isLoggedIn]);

 
  return (
    <>
{isLoggedIn ? 

     (
       <>
        <Navbar />
      <div className={classes.pageMargin}>
        <Card className={classes.root}>
          <Typography className={classes.title} color="textPrimary" gutterBottom>
            {user.username}
          </Typography>
          <CardHeader
            className={classes.removePadding}
           
            avatar={ avatarURL ? <Avatar src={avatarURL} alt="gh-avatar" className={classes.avatarImg} /> : <Avatar aria-label="recipe" className={classes.avatar}>
                {user.username}
              </Avatar>
              }
            title={<p>Hello</p>}
           
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
              <Typography variant="body2" component="p">
                {user.bio}
              </Typography>
              <Typography className={classes.pos} color="textPrimary">

                <Link href={`https://github.com/${user.github}`} className={classes.imageSize}>
                  <div >
                    <img src={"/images/products/product_5.png"} alt="github-logo" className={classes.imageSize} />

                  </div>
                </Link>
              </Typography>
            </div>
          </CardContent>
          <CardActions>
            {localStorage.getItem('uid') === user._id ? <Button size="small" color="primary" variant='outlined' className={classes.noMargin, classes.fullWidth}>Edit</Button> : <div> </div>}
          </CardActions>
        </Card>
      </div>

      <div className={classes.root, classes.elementMargin}>
        <ExpansionPanel expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography className={classes.heading}>{user.username}'s Ideas</Typography>
            {/* <Typography className={classes.secondaryHeading}>{user.username}'s Ideas</Typography> */}
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>

            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2bh-content"
            id="panel2bh-header"
          >
            <Typography className={classes.heading}>{user.username}'s Pinned Projects</Typography>
            {/* <Typography className={classes.secondaryHeading}>
            Review all your posts 
          </Typography> */}
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus, varius pulvinar
              diam eros in elit. Pellentesque convallis laoreet laoreet.
          </Typography>
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

