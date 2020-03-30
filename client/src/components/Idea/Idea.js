import React, {useState, useEffect} from 'react'
import Navbar from '../Navbar'
import TextareaAutosize from '@material-ui/core/TextareaAutosize'
import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'

import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
//import axios from 'axios'

import './Idea.css'

export default function Idea() {
    const ideaCSS = {

    }

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
                    <Typography color="textSecondary" gutterBottom>
                    Author
                    </Typography>
                    <Typography variant="h5" component="h2">
                    Title
                    </Typography>
                </CardContent>
                <CardActions>
                    
                </CardActions>
            </Card>

            <section className="section-solution">
                <h3>Solution:</h3>
                
            </section>

            <TextareaAutosize aria-label="minimum height" rowsMin={3} placeholder="Write a comment" />
            <Button
                variant="contained"
                color="primary"
                endIcon={<Icon>send</Icon>}
            >
                Send
            </Button>
            <ul className="ul-comments">
                {/* {comments.map(comment => <li>{comment}</li>)}  */}
                <li>Comment #1</li>
            </ul>

        </div>
        
    )
}

