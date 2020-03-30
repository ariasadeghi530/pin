import React, {useState, useEffect} from 'react'
import Navbar from '../Navbar'
import TextareaAutosize from '@material-ui/core/TextareaAutosize'
import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'
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
            <h1>Project Idea Title</h1>
            <h2>Author: Author</h2>

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

