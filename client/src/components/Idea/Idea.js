import React, { useContext, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'

import Navbar from '../Navbar'
import TextareaAutosize from '@material-ui/core/TextareaAutosize'
import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'

import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';

import PostContext from '../../utils/PostContext';
import UserContext from '../../utils/UserContext';

import './Idea.css'

export default function Idea() {
    const singleLineGridListStyles = makeStyles((theme) => ({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            overflow: 'hidden',
            backgroundColor: theme.palette.background.paper,
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
            display: "flex",
            justifyContent: 'flex-end',
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
            fontSize: 14
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
        deployMargin:{
            marginLeft: "0px !important",
        }
    }))

    const classes = singleLineGridListStyles()

    const { post, postOwner, solutions, comments, handleViewPost } = useContext(PostContext);
    const { isLoggedIn } = useContext(UserContext);
    const ideaId = (window.location.pathname).slice(5);

    useEffect(() => {
        handleViewPost(ideaId);
    }, isLoggedIn)
    console.log(post)
    console.log(solutions)
    return (
        <div>
            <Navbar />

            <Card className={classes.marginTop}>
                <CardContent>
                    <Typography color="textSecondary" className={classes.username} gutterBottom >
                        {postOwner}
                    </Typography>
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
                <div className={classes.solTitle}>
                    <Typography component="h6" variant="h5" className={classes.alignLeft}>
                        Solutions
                                     </Typography>
                    <Button color="primary" className={classes.floatRight}>Add a solution</Button>
                </div>
                <GridList className={classes.gridList} cols={2.5}>
                    {solutions.map((solution, index) => (
                        <GridListTile key={index}>
                            <Card className={classes.root}>
                                <CardContent>
                                    <Typography className={classes.titleSol} color="textSecondary" gutterBottom>
                                        {solution.poster}
                                    </Typography>
                                    <Typography className={classes.description}>
                                        {solution.description}
                                    </Typography>
                                </CardContent>
                                <CardActions >
                                    
                                    <Button size="small" href={solution.github} target="_blank">Github</Button>
                                    <Button size="small"href={solution.deployed} target="_blank" className={classes.deployMargin} >Deployed</Button>
                                    
                                </CardActions>
                            </Card>
                        </GridListTile>
                    ))}
                </GridList>
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


    )
}


