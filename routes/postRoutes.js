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





module.exports = router;