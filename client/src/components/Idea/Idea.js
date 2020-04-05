import React, { useContext, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Redirect } from 'react-router-dom';
import { createMuiTheme } from '@material-ui/core/styles';

import Navbar from '../Navbar'
import TextareaAutosize from '@material-ui/core/TextareaAutosize'
import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';



import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';


import PostContext from '../../utils/PostContext';
import UserContext from '../../utils/UserContext';

import './Idea.css'

export default function Idea() {

    
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

    const singleLineGridListStyles = makeStyles((theme) => ({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            overflow: 'hidden',
            backgroundColor: theme.palette.background.paper,
        },
        cardRoot: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            overflow: 'hidden',
            backgroundColor: theme.palette.background.paper,
            height: '180px'
        },
        cardBody: {
            height: '109px'
        },
        gridList: {
            flexWrap: 'nowrap',
            // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
            transform: 'translateZ(0)',
            marginTop: "1%",
            marginBottom: "1%",
        },
        title: {
            color: theme.palette.primary.light,
        },
        titleBar: {
            background:
                'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',

        },
        width: {
            width: '100%'
        },
        marginTop: {
            marginTop: "20%"
        },
        username: {
            
            justifyContent: 'flex-end',
           alignSelf: 'flex-end',
           alignContent: 'flex-end'
        },
        titleSol: {
            fontSize: 14,
            display: "flex",
            justifyContent: 'flex-start',
        },
        pos: {
            marginBottom: 12,
        },
        description: {
            fontSize: 12
        },
        alignLeft: {
            display: 'grid',
            alignContent: 'flex-start',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            flexGrow: 1
        },
        floatRight: {
            display: 'grid',
            justifyContent: 'flex-end',
            width: '50%',
            flexGrow: 1
        },
        solTitle: {
            display: 'flex'
        },
        deployMargin: {
            marginLeft: "0px !important",
        },
        pin: {
            
            justifyContent: 'flex-start',
        },
        flex:{
            display: 'flex',
            justifyContent: 'space-between'
        },
        logo:{
            
            height: '22px',
            width: '22px',
            marginTop: '8px',
            // marginLeft: '10px'
        },
        clickLogo:{
            background: myTheme.palette.primary.main,
            borderRadius: '3px',
            height: '22px',
            width: '22px',
            marginTop: '8px',
            
        },
        solutionUName:{
            justifyContent: 'flex-start',
            paddingBottom: "6px"
        },
        solutionDel:{
 
            justifyContent: 'flex-end',
           alignSelf: 'flex-end',
           alignContent: 'flex-end', 
        },
        deleteButton:{
            paddingTop: 0,
            paddingRight: 0,
            paddingBottom: 9
        }
    }))

    const classes = singleLineGridListStyles()

    const { post, postOwner, solutions, comments, addSol, edit, handleViewPost, handleToggleSolution, handleToggleEdit, handleInputChange, desc, gh, deployed, handleAddSolution, posterId, handleRemSolution } = useContext(PostContext);

    const { isLoggedIn, handlePin, projects, handleUnPin } = useContext(UserContext);

    const ideaId = (window.location.pathname).slice(6);
    let userID = localStorage.getItem('uid');

    const [anchorEl, setAnchorEl] = React.useState(null);

     const handleClick = (event) => {
       setAnchorEl(event.currentTarget);
     };

     const handleClose = () => {
      setAnchorEl(null);
     };



    useEffect(() => {
        handleViewPost(ideaId);
    }, [isLoggedIn])
 

    return (
        <>
            {isLoggedIn ?
                (
                    <>
                        <div>
                            <Navbar />

                            <Card className={classes.marginTop}>
                                <CardContent>
                                    <div className={classes.flex}>
                                   { projects.includes(ideaId) ?  <div className={classes.pin}>
                                        <Button onClick={() => handleUnPin(ideaId)}>
                                    <img src="https://image.flaticon.com/icons/svg/212/212816.svg" className={classes.clickLogo} alt="pin logo"/> 
                                    </Button>
                                    </div> : <div className={classes.pin}>
                                        <Button onClick={() => handlePin(ideaId)}>
                                    <img src="https://image.flaticon.com/icons/svg/212/212816.svg" className={classes.logo} alt="pin logo"/> 
                                    </Button>
                                    </div>
                                    }
                                    {posterId == userID ?
                                        <div className={classes.username}>  <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                                        <MoreVertIcon />
                                      </Button>
                                      <Menu
                                        id="simple-menu"
                                        anchorEl={anchorEl}
                                        keepMounted
                                        open={Boolean(anchorEl)}
                                        onClose={handleClose}
                                      >
                                        <MenuItem onClick={handleClose}>Edit Idea</MenuItem>
                                        <MenuItem onClick={handleClose}>Delete Idea</MenuItem>
                                      </Menu>
                                    </div>  :
                                        <Typography color="textSecondary" className={classes.username} gutterBottom >
                                            {postOwner}
                                        </Typography>
                                    }
                                    </div>
                                    <Typography variant="h4" component="h2">
                                        {post.title}
                                    </Typography>
                                    <Typography>
                                        {post.description}
                                    </Typography>
                                    <Typography>
                                        {post.difficulty}
                                    </Typography>
                                    <Typography>
                                        Estimated total time: {post.totalTime}
                                    </Typography>
                                </CardContent>
                                <CardActions>

                                </CardActions>
                            </Card>

                            <Box m={1}>
                                {!addSol ? (
                                    <>
                                        <div className={classes.solTitle}>
                                            <Typography component="h6" variant="h5" className={classes.alignLeft}>
                                                Solutions
                        </Typography>
                                            <Button color="primary" className={classes.floatRight} name="addSol" value={addSol} onClick={() => handleToggleSolution()}>Add a solution</Button>
                                        </div>
                                        <GridList className={classes.gridList} cols={2.5}>
                                            {solutions.map((solution, index) => (
                                                <GridListTile key={index}>
                                                    <Card className={classes.cardRoot}>
                                                        <CardContent className={classes.cardBody}>
                                                          
                                                                <div className={classes.flex}>
                                                                    <div className={classes.solutionUName}>
                                                                {solution.poster}
                                                                    </div>
                                                                    <div className={classes.solutionDel}>
                                                                   { solution.uid === userID ?
                                                                   <>
                                                                    <IconButton size="small"className={classes.deleteButton} onClick={()=>handleRemSolution(ideaId,solution)}>
                                                                         <DeleteOutlineIcon fontSize="small"/>
                                                                     </IconButton> 
                                                                     </> : 
                                                                    <div>
                                                                   
                                                                     </div> 
                                                                     }
                                                                    </div>
                                                                </div>
                                                          
                                                            <Typography className={classes.description}>
                                                                {solution.description}
                                                            </Typography>
                                                        </CardContent>
                                                        <CardActions >

                                                            <Button size="small" href={solution.github} target="_blank">Github</Button>
                                                            <Button size="small" href={solution.deployed} target="_blank" className={classes.deployMargin} >Deployed</Button>

                                                        </CardActions>
                                                    </Card>
                                                </GridListTile>
                                            ))}
                                        </GridList>
                                    </>) : (
                                        <>
                                            <div className={classes.solTitle}>
                                                <Typography component="h6" variant="h5" className={classes.alignLeft}>
                                                    Add A Solution
                                    </Typography>
                                                <Button color="primary" className={classes.floatRight} name="saveSol" value={addSol} onClick={(e) => handleAddSolution(e, post._id)}>Save solution</Button>
                                            </div>
                                            <GridList className={classes.gridList} cols={1}>
                                                <Box m={0.5}>
                                                    <form className={classes.form} noValidate>
                                                        <TextField
                                                            variant="outlined"
                                                            fullWidth
                                                            name="desc"
                                                            label="Short Descripton"
                                                            size="small"
                                                            id="desc"
                                                            margin="normal"
                                                            required
                                                            value={desc}
                                                            onChange={handleInputChange}
                                                        />
                                                        <TextField
                                                            variant="outlined"
                                                            required
                                                            margin="normal"
                                                            size="small"
                                                            fullWidth
                                                            id="gh"
                                                            label="Github Repo Link"
                                                            name="gh"
                                                            value={gh}
                                                            onChange={handleInputChange}
                                                        />
                                                        <TextField
                                                            variant="outlined"
                                                            fullWidth
                                                            name="deployed"
                                                            label="Deployed App Link"
                                                            size="small"
                                                            id="deployed"
                                                            margin="normal"
                                                            value={deployed}
                                                            onChange={handleInputChange}
                                                        />
                                                    </form>
                                                </Box>
                                            </GridList>
                                        </>)
                                }
                            </Box>

                            <ul className="ul-comments">
                                {/* {comments.map(comment => <li>{comment}</li>)}  */}

                            </ul>
                            <Container>
                                <TextareaAutosize aria-label="minimum height" rowsMin={3} placeholder="Write a comment" className={classes.width} style={{
                                    margin: '1% 1% 1% 1%'
                                }} />


                                <Button
                                    size="small"
                                    variant="contained"
                                    color="primary"
                                    endIcon={<Icon>send</Icon>}
                                >
                                </Button>
                            </Container>


                        </div>
                    </>
                ) :
                <Redirect to={{ pathname: '/signin' }} />}
        </>
    );
}


