import React, {useState, useEffect} from 'react'
import Navbar from '../Navbar'
//import axios from 'axios'

export default function Idea() {
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

            <section>
                <h3>Solution:</h3>
                
            </section>

            <ul>
                {/* {comments.map(comment => <li>{comment}</li>)}  */}
                <li>Comment #1</li>
            </ul>

        </div>
        
    )
}

