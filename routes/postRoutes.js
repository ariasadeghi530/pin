const router = require('express').Router();
const passport = require('passport');

const { Post, User } = require('../models');

// Get all posts
router.get('/posts', passport.authenticate('jwt'), (req, res) => {
  Post.find()
    .then((posts) => {
      res.json(posts);
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
  Post.create({title: req.body.title, description: req.body.description, difficulty: req.body.difficulty, totalTime: req.body.totalTime, imageLinks: req.body.imageLinks, owner: [req.user._id]})
  .then((post) => {
    res.json(post);
    User.findByIdAndUpdate(req.user._id, {$push: {ideas: post}})
    .then(() => res.sendStatus(200))
    .catch(e => console.error(e))
  })
  .catch(e => console.error(e))
})

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




module.exports = router;