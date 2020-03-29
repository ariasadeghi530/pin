const router = require('express').Router();
const passport = require('passport');

const { Post, User } = require('../models');



// Get all posts
router.get('/posts', passport.authenticate('jwt'), (req, res) => {
  Post.find()
    .then((posts) => {

     let allPosts = [];
     for(let i = 0; i < posts.length; ++i){
       User.find({_id: posts[i].owner})
       .then((user) => {
         allPosts[i] = {post: posts[i], user};
         if(i === posts.length - 1){
           res.json(allPosts);
         }
       })
       .catch(e => console.log(e));
     }
    
    })
    .catch(e => console.log(e));
});

//get one post
router.get('/posts/:postID', passport.authenticate('jwt'), (req, res) => {
  Post.findById(req.params.postID)
  .then((post) => res.json(post))
  .catch(e => console.error(e));
});

//create a post/idea
router.post('/posts' , passport.authenticate('jwt'), (req, res) => {
  Post.create({title: req.body.title, description: req.body.description, difficulty: req.body.difficulty, totalTime: req.body.totalTime, imageLinks: req.body.imageLinks, owner: req.user._id, solutions: [], comments: []})
  .then((post) => {
    res.json(post);
    User.findByIdAndUpdate(req.user._id, {$push: {ideas: post}})
    .then(() => res.sendStatus(200))
    .catch(e => console.error(e))
  })
  .catch(e => console.error(e))
});

//Update a specific post
router.put('/posts/:postID', passport.authenticate('jwt'), (req, res) => {
  Post.findByIdAndUpdate(req.params.postID, req.body).then(() => {
  Post.findById(req.params.postID)
  .then((post) => res.json(post))
  .catch(e => console.error(e))
})
.catch(e => console.error(e))
});

//add a solution to a post
router.put('/posts/:postID/solutions', passport.authenticate('jwt'), (req, res) => {
  Post.findByIdAndUpdate(req.params.postID, {$push: {solutions: { github: req.body.github, deployed: req.body.deployed, owner: req.user._id}}})
  .then(() => {
    Post.findById(req.params.postID)
  .then((post) => res.json(post))
  .catch(e => console.error(e))
})
  .catch(e => console.error(e))
});

//add a comment to a post
router.put('/posts/:postID/comments', passport.authenticate('jwt'), (req, res) => {
  Post.findByIdAndUpdate(req.params.postID, {$push: {comments: { comment: req.body.comment, owner: req.user._id}}})
  .then(() => {
    Post.findById(req.params.postID)
  .then((post) => res.json(post))
  .catch(e => console.error(e))
})
  .catch(e => console.error(e))
});

//remove a solution from a post
router.delete('/posts/:postID/solutions', passport.authenticate('jwt'), (req, res) => {
  Post.findByIdAndUpdate(req.params.postID, {$pull: {solutions: { github: req.body.github, deployed: req.body.deployed, owner: req.user._id}}})
  .then(() => {
    Post.findById(req.params.postID)
  .then((post) => res.json(post))
  .catch(e => console.error(e))
})
  .catch(e => console.error(e))
});

//remove a comment from a post
router.delete('/posts/:postID/comments', passport.authenticate('jwt'), (req, res) => {
  Post.findByIdAndUpdate(req.params.postID, {$pull: {comments: { comment: req.body.comment, owner: req.user._id}}})
  .then(() => {
    Post.findById(req.params.postID)
  .then((post) => res.json(post))
  .catch(e => console.error(e))
})
  .catch(e => console.error(e))
});

//delete a users post
router.delete('/posts/:ideaID', passport.authenticate('jwt'), (req, res) => {
  Post.findByIdAndDelete(req.params.ideaID)
  .then(()=> {User.findByIdAndUpdate(req.user._id, {$pull: {ideas: req.params.ideaID}})
  .then(() => {
    User.findById(req.user._id)
    .then((user) => res.json(user))
    .catch(e => console.error(e))
  })
  .catch(e => console.error(e))
  })
  .catch(e => console.error(e));
})


// "title": "hello",
// "description": "world",
// "difficulty": "Easy",
// "totalTime": 21,
// "imageLinks": ["linkOne", "linkTwo"]


module.exports = router;