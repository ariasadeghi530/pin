import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles'

import Navbar from '../Navbar'
import TextareaAutosize from '@material-ui/core/TextareaAutosize'
import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'

import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
//import axios from 'axios'

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
        }
    }))

    const classes = singleLineGridListStyles()
    let tileData = {}
    const [comments, setComments] = useState([])
    /*
    useEffect(() => {
        axios.get('')
            .then(res => {
                setComments(res.data)
            })
            .catch(err => console.error(err))

    }, [])
    */
    return (
        <div>
            <Navbar />
            <br /> <br /> <br /> <br /> <br /> <br />
            <Card>
                <CardContent>
                    <Typography color="textSecondary" gutterBottom style={{
                        float: 'right'
                    }}>
                    Author
                    </Typography>
                    <Typography variant="h5" component="h2">
                    Title
                    </Typography>
                    <Typography>
                        Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec fringilla magna.
                    </Typography>
                    <Typography>
                        Difficulty: easy
                    </Typography>
                    <Typography>
                        Total time: 12 hours
                    </Typography>
                </CardContent>
                <CardActions>
                    
                </CardActions>
            </Card>

            <div className={classes.root}>
            
            {/* <GridList className={classes.gridList} cols={2.5}>
                {tileData.map((tile) => (
                <GridListTile key={tile.img}>
                    <img src={tile.img} alt={tile.title} />
                    <GridListTileBar
                    title={tile.title}
                    classes={{
                        root: classes.titleBar,
                        title: classes.title,
                    }}
                    actionIcon={
                        <IconButton aria-label={`star ${tile.title}`}>
                        
                        </IconButton>
                    }
                    />
                </GridListTile>
                ))}
            </GridList> */}
        </div>

        <ul className="ul-comments">
            {/* {comments.map(comment => <li>{comment}</li>)}  */}
            <li>Comment #1</li>
        </ul>
        <div className={classes.width}>
            <TextareaAutosize aria-label="minimum height" rowsMin={3} placeholder="Write a comment" className={classes.width} style={{
                    margin: '1% 1% 1% 1%'
            }} />
                
            
        </div>
        <Button
                variant="contained"
                color="primary"
                endIcon={<Icon>send</Icon>}
            >
                Send
            </Button>
            
            
    </div>
        
    
    )
}


